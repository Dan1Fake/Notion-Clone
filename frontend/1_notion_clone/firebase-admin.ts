import { initializeApp, getApps, cert, App, getApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'), // <- IMPORTANT
};

let app: App;

if (!getApps().length) {
  app = initializeApp({
    credential: cert(serviceAccount as any),
  });
} else {
  app = getApp();
}

const adminDb = getFirestore(app);

export { adminDb, app as adminApp };
