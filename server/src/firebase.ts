import type { App, AppOptions } from "firebase-admin/app";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import type { Firestore } from "firebase-admin/firestore";
import { getFirestore } from "firebase-admin/firestore";

type FIREBASE_ADMIN_APP = {
  instance?: App;
  name: string;
  app: App;
};

type FIREBASE_ADMIN = {
  db: Firestore;
};

const firebaseConfig: AppOptions = {
  credential: cert({
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY,
    projectId: process.env.FIREBASE_PROJECT_ID,
  }),
  // databaseURL: process.env.FIREBASE_DATABASE_URL,
};

const firebaseApp: FIREBASE_ADMIN_APP = {
  get app() {
    if (!firebaseApp.instance) {
      firebaseApp.instance =
        getApps().find(({ name }) => name === firebaseApp.name) || initializeApp(firebaseConfig, firebaseApp.name);
    }
    return firebaseApp.instance;
  },
  name: "ServerApp",
};

export const firebase: FIREBASE_ADMIN = {
  get db() {
    return getFirestore(firebaseApp.app);
  },
};
