import admin from 'firebase-admin';
import {readFileSync } from 'fs';

const serviceAccount = JSON.parse(
readFileSync(new URL('../serviceAccountKey.json', import.meta.url), 'utf8')
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://it-training-version-final.firebaseio.com"
});

const db = admin.firestore();
export default db;
