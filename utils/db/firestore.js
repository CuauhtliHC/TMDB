import db from "./index";

const firestore = db.firestore();
firestore.settings({ ignoreUndefinedProperties: true });

export default firestore;
