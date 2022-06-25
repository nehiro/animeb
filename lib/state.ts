// export const createState = functions
//   .region('asia-northeast1')
//   .https.onCall(async (data, context) => {
//     // ランダム文字列を生成
//     const state: string = admin.firestore().collection('_').doc().id;
//     await admin.firestore().doc(`states/${state}`).set({ state });
//     return state;
//   });
