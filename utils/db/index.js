import admin from "firebase-admin";
import serviceAccount from "../../tmdb-b6b20-firebase-adminsdk-3741q-23771f0ecf.json";

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "https://tmdb-b6b20-default-rtdb.firebaseio.com",
    });
  } catch (error) {
    console.log("Firebase admin initialization error", error.stack);
  }
}

export default admin;
