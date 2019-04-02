const functions = require('firebase-functions');
let admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

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
