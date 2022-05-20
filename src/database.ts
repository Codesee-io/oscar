import {
  cert,
  getApp,
  getApps,
  initializeApp,
  ServiceAccount,
} from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// The FIREBASE_SERVICE_ACCOUNT_KEY is a stringified JSON blob. We convert it
// to actual JSON before initializing the service account.
const serviceAccountConfig = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT_KEY
);

const serviceAccount: ServiceAccount = {
  clientEmail: serviceAccountConfig.client_email,
  privateKey: serviceAccountConfig.private_key.replace(/\\n/gm, "\n"),
  projectId: serviceAccountConfig.project_id,
};

const app =
  getApps().length === 0
    ? initializeApp({ credential: cert(serviceAccount) })
    : getApp();

const db = getFirestore(app);

export { db };
