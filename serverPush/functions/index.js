const functions = require('firebase-functions');
let admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const db = admin.database();

// новое объявление, нужно отправить Push по топику
exports.newAd = functions.database.ref('ads/{key}').onCreate((snapshot, context) => {
    let payload = {
        notification: {
            body: snapshot._data.job,
            sound: 'default',
            badge: '1',
            title: snapshot._data.category,
            click_action: 'FCM_PLUGIN_ACTIVITY'
        },
        data: {
            "url": '/detail/' + context.params['key']
        }
    };

    admin.messaging().sendToTopic(transliterate(snapshot._data.category), payload)
        .then(function (response) {
            console.log("Push отправлен:", response);
        }).catch(function (error) {
            console.log("Ошибка отправки Push:", error);
        });

    return 'ok';
});

// новое уведомление, нужно отправить Push
exports.newNotify = functions.database.ref('/notifications/{user}/{key2}').onWrite((change, context) => {

    // if (change.before.exists()) {
    //     return null;
    // }
    // Exit when the data is deleted.
    // if (!change.after.exists()) {
    //     return null;
    // }

    const original = change.after.val();
    console.log(original);

    if (original.active == false) {
        //console.log('Пропускаем статус доставки уведомления');
        return null;
    }

    if (original.isRead == true) {
        //console.log('Пропускаем событие чтения');
        return null;
    }

    //console.log('userID: ' + context.params['user']);
    admin.database().ref('push/' + context.params['user']).on("value", function (snapshots) {
        snapshots.forEach(function (record) {
            var token = record.val();
            console.log('token: ' + token);

            let payload = {
                notification: {
                    body: original.text,
                    sound: 'default',
                    badge: '1',
                    title: original.subject,
                    click_action: 'FCM_PLUGIN_ACTIVITY'
                },
                data: {
                    "url": original.url
                }
            };

            admin.messaging().sendToDevice(token, payload).then(function (response) {
                console.log("Push отправлен:");
                console.log(response);
            }).catch(function (error) {
                console.log("Ошибка отправки Push:", error);
            });

        });
    });

    return 'ok';
});

// перевод русского топика на латиницу
function transliterate(word) {
    let answer = '';
    const a = {};

    a["Ё"] = "YO"; a["Й"] = "I"; a["Ц"] = "TS"; a["У"] = "U"; a["К"] = "K"; a["Е"] = "E"; a["Н"] = "N"; a["Г"] = "G"; a["Ш"] = "SH"; a["Щ"] = "SCH"; a["З"] = "Z"; a["Х"] = "H"; a["Ъ"] = "";
    a["ё"] = "yo"; a["й"] = "i"; a["ц"] = "ts"; a["у"] = "u"; a["к"] = "k"; a["е"] = "e"; a["н"] = "n"; a["г"] = "g"; a["ш"] = "sh"; a["щ"] = "sch"; a["з"] = "z"; a["х"] = "h"; a["ъ"] = "";
    a["Ф"] = "F"; a["Ы"] = "I"; a["В"] = "V"; a["А"] = "a"; a["П"] = "P"; a["Р"] = "R"; a["О"] = "O"; a["Л"] = "L"; a["Д"] = "D"; a["Ж"] = "ZH"; a["Э"] = "E";
    a["ф"] = "f"; a["ы"] = "i"; a["в"] = "v"; a["а"] = "a"; a["п"] = "p"; a["р"] = "r"; a["о"] = "o"; a["л"] = "l"; a["д"] = "d"; a["ж"] = "zh"; a["э"] = "e";
    a["Я"] = "Ya"; a["Ч"] = "CH"; a["С"] = "S"; a["М"] = "M"; a["И"] = "I"; a["Т"] = "T"; a["Ь"] = ""; a["Б"] = "B"; a["Ю"] = "YU";
    a["я"] = "ya"; a["ч"] = "ch"; a["с"] = "s"; a["м"] = "m"; a["и"] = "i"; a["т"] = "t"; a["ь"] = ""; a["б"] = "b"; a["ю"] = "yu"; a[" "] = "_";

    for (const i in word) {
        if (word.hasOwnProperty(i)) {
            if (a[word[i]] === undefined) {
                answer += word[i];
            } else {
                answer += a[word[i]];
            }
        }
    }
    return answer.toLowerCase();
}

// колбек функция для АТС при поступлении звонка
exports.callbackAuthPhone = functions.https.onRequest((req, res) => {
    var dataQuery = req.body;

    db.ref('auth/' + dataQuery.caller_id).once("value", (data) => {
        var dateCreate = data.val() && data.val().dateCreate;
        var authID = data.val() && data.val().authID;
        var uid = data.val() && data.val().uid;
        if (dateCreate) {
            var deltaTime = new Date().valueOf() - dateCreate;
            if (deltaTime <= 60000) {
                // Найдем есть ли у нас уже такой пользователь с номером
                admin.auth().getUserByPhoneNumber('+' + dataQuery.caller_id)
                    .then(function (userRecord) {
                        console.log('Successfully fetched user data:', userRecord.toJSON());

                        // нашли пользователя с номером, его и восстанавливаем                        
                        createAndSaveToken(userRecord.uid, dataQuery.caller_id, authID);
                    })
                    .catch(function (error) {
                        console.log('Error fetching user data:', error);

                        // не нашли пользователя с номером, тогда закрепим текущий uid за этим номером
                        createAndSaveToken(uid, dataQuery.caller_id, authID);
                    });
            }
        }
    });

    res.status(200).send(req.query.zd_echo);
});

// создает кастомный токен пользователя для авторизации по звонку
function createAndSaveToken(uid, caller_id, authID) {
    admin.auth().createCustomToken(uid)
        .then(function (customToken) {
            admin.auth().updateUser(uid, {
                phoneNumber: '+' + caller_id
            });
            admin.database().ref().child('authHistory/' + authID).update({
                call_id: customToken
            });
        })
        .catch(function (error) {
            console.log('Error creating custom token:', error);
        });
}

// функция выдачи индентификатора авторизации по звонку
exports.getAuthID = functions.https.onRequest((req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    db.ref('auth/' + req.query.phone).once("value", (data) => {
        var dateCreate = data.val() && data.val().dateCreate;
        var authID = data.val() && data.val().authID;
        if (dateCreate) {
            var deltaTime = new Date().valueOf() - dateCreate;
            // console.log(deltaTime);
            if (deltaTime <= 60000) {
                res.status(200).json({ error: 'Авторизация возможна через минуту.' });
                return;
            }
        }

        db.ref('authHistory/' + authID).remove();
        var authRef = db.ref().child('authHistory').push();
        authRef.set({
            phoneClient: req.query.phone,
            phoneAuth: '+74991131939',
            dateCreate: new Date().valueOf()
        }, function (value) {
            db.ref().child('auth/' + req.query.phone).set({
                phoneAuth: '+74991131939',
                dateCreate: new Date().valueOf(),
                authID: authRef.key,
                uid: req.query.uid
            });
            res.status(200).json({
                key: authRef.key,
                call: 'tel:+74991131939'
            });
        });
    });
});

// Функция для колбека платежного агрегатора, пополнение баланса
exports.callbackBalance = functions.https.onRequest((req, res) => {
    var userID = req.query.userID;
    var sum = 1000; // с минусом вычтет из баланса
    operationBalance(userID, sum, null, 'Пополнение баланса', '(с помощью пластиковой карты)');
    res.status(200).send();
});

// Функция работы с балансом
function operationBalance(userID, sum, ref, title, detail) {
    const adaRankRef = db.ref(`balance/${userID}/sum`);
    adaRankRef.transaction(function (balance) {
        var newValue = balance + sum;        
        return newValue;
    }, (error, committed, snapshot) => {
        if (committed) {
            db.ref(`balance/${userID}/history`).push({
                sum: sum,
                dateCreate: new Date().toISOString(),
                title: title,
                detail: detail
            });            
            if (ref) {
                ref.child('pay').set(true);
            }
        }
    });
}

// новая подписка, если платная, спишем деньги
exports.newSubscription = functions.database.ref('subscription/{user}/{category}').onCreate((snapshot, context) => {    
    db.ref('categories').orderByChild('name').equalTo(context.params['category']).
        once('value', (data) => {
            const categoryItems = data.val();
            for (const key in categoryItems) {
                const price = categoryItems[key]['price'];
                if (price > 0) {
                    operationBalance(context.params['user'], -price, snapshot.ref, `Подписка на "${context.params['category']}"`, '(ежемесячный платеж за доступ к объявлениям)');
                }
            }
        });
});