import * as admin from "firebase-admin";
import serviceAccount from "../../service-account-file.json";

if (admin.apps.length == 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://tmdb-b6b20-default-rtdb.firebaseio.com",
  });
  admin.firestore().settings({ ignoreUndefinedProperties: true });
}

export const adminApp = admin.app();
