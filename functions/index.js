const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request) => {
  functions.logger.info(`Hello logs! ${JSON.stringify(request.body)}`, {structuredData: true});
  response.send("Hello from Firebase!");
});

// exports.attack = functions.firestore
//     .document("/rooms/{room}/logList/{logId}")
//     .onCreate((snap) => {
//       // Get an object representing the document
//       // e.g. {'name': 'Marie', 'age': 66}
//       const logValue = snap.data();
//       if (logValue.type === "attack") {
//         const damage = snap.data().content;
//         functions.firestore.document('/rooms/{room}/enemyList/')
//       }
//       // access a particular field as you would any JS property
//       const name = newValue.name;

//       // perform desired operations ...
//     });
