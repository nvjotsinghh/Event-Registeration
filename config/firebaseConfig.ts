import admin from "firebase-admin";

if (!admin.apps.length) {
  try {
    const serviceAccount = require("../serviceAccountKey.json");
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } catch {
    // serviceAccountKey.json not available (e.g. in CI/test environment)
    console.warn("Firebase service account not found, skipping initialization.");
  }
}

export const db = admin.firestore();