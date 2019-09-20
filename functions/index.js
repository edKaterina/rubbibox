const functions = require('firebase-functions');
let admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const gmailPassword = functions.config().gmail.password;
const gmailLogin = functions.config().gmail.login;
const mailTransport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: gmailLogin,
        pass: gmailPassword  
    },
});
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
exports.newClaim = functions.database.ref('claim/{key}').onCreate((snapshot, context) => {
    console.log( {
        user: gmailLogin,
        pass: gmailPassword  
    });
const claim = snapshot._data;
    const mailOptions = {
        from: gmailLogin,
        to: 'rubbibox@gmail.com',
        text: 'Тип жалобы:'+ claim.text
    };
   
admin.database().ref('users/' + claim.user).once("value").then(
        function (snapshots) {

            var token = snapshots.val();
             if(!!!token.fio){  
                mailOptions.subject = `Не зарегистрированный пользователь пожаловался на задание #${claim.id}`;
                mailOptions.text = mailOptions.text;
             }else{
                mailOptions.subject = ` ${token.fio} Пользователь пожаловался на задание #${claim.id}`;
                mailOptions.text = mailOptions.text + '\nПользователь\nИмя: ' + token.fio + '\nТелефон: ' + token.phone;
           }
          
            try {
                mailTransport.sendMail(mailOptions);
                console.log(`New email sent to:`, 'rubbibox@gmail.com');
            } catch (error) {
                console.error('There was an error while sending the email:', error);
            }
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
    a["я"] = "ya"; a["ч"] = "ch"; a["с"] = "s"; a["м"] = "m"; a["и"] = "i"; a["т"] = "t"; a["ь"] = ""; a["б"] = "b"; a["ю"] = "yu"; a[" "] = "_"; a["("] = ""; a[")"] = "";

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
// exports.callbackBalance = functions.https.onRequest((req, res) => {
//     var userID = req.query.userID;
//     var sum = 1000; // с минусом вычтет из баланса
//     operationBalance(userID, sum, null, 'Пополнение баланса', '(с помощью пластиковой карты)');
//     res.status(200).send();
// });

// Проверка валидности пришедшего платежа
function isValidPay(params) {
    var yandexSecret = 'cOHbxxJ6k28FBlHQBV2J8jHq';

    var result = params['notification_type']
        + '&' + params['operation_id']
        + '&' + params['amount']
        + '&' + params['currency']
        + '&' + params['datetime']
        + '&' + params['sender']
        + '&' + params['codepro']
        + '&' + yandexSecret
        + '&' + params['label'];

    return (require('crypto').createHash('sha1').update(result).digest('hex') == params['sha1_hash']);
}

// Функция для колбека Яндекс.Деньги, пополнение баланса
exports.callbackYandexBalance = functions.https.onRequest((req, res) => {
    var userID = req.body.label;
    var sum = parseFloat(req.body.withdraw_amount);

    if (isValidPay(req.body)) {
        operationBalance(userID, sum, null, 'Пополнение баланса', '(с помощью пластиковой карты)');
    } else
        console.error('Не валидный платеж или неверный yandexSecret в серверной функции isValidPay', req.body);

    res.status(200).send();
});

// Функция работы с балансом
function operationBalance(userID, sum, ref, title, detail) {
    const adaRankRef = db.ref(`balance/${userID}/sum`);

    adaRankRef.once('value', (data) => {
        var newSumAfterOperation = parseFloat(data.val());
        if (!newSumAfterOperation) {
            newSumAfterOperation = 0;
        }
        newSumAfterOperation = newSumAfterOperation + sum;
        if (newSumAfterOperation >= 0) {
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
                        ref.update({
                            pay: true,
                            dateBeginPeriod: new Date().toISOString()
                        });
                    }
                }
            });
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

// Функция проверки подписок, оплата и продление
exports.checkSubscription = functions.https.onRequest((req, res) => {
    const payCategory = {};
    db.ref('categories').once('value', (data) => {
        const categoryItems = data.val();
        for (const key in categoryItems) {
            const price = categoryItems[key]['price'];
            const name = categoryItems[key]['name'];
            if (price > 0) {
                payCategory[name] = price;
            }
        }

        db.ref('subscription').
            once('value', (data) => {
                const subscriptionUsers = data.val();
                for (const user in subscriptionUsers) {
                    const subscriptionCategory = subscriptionUsers[user];
                    for (const category in subscriptionCategory) {
                        if (payCategory[category]) {
                            if (!subscriptionCategory[category]['pay'] == true) { // не было оплачено ранее
                                operationBalance(user, -parseFloat(payCategory[category]), db.ref(`subscription/${user}/${category}`), `Подписка на "${category}"`, '(ежемесячный платеж за доступ к объявлениям)');
                            }
                            const dateBeginPeriod = subscriptionCategory[category]['dateBeginPeriod'];
                            var deltaTime = (new Date().valueOf() - Date.parse(dateBeginPeriod)) / (1000 * 60 * 60 * 24);
                            if (deltaTime > 30) { // прошло 30 дней, пора продлевать подписку
                                operationBalance(user, -parseFloat(payCategory[category]), db.ref(`subscription/${user}/${category}`), `Подписка на "${category}"`, '(ежемесячный платеж за доступ к объявлениям)');
                            }
                        }
                    }
                }
            });
    });


    res.status(200).send();
});
