import * as firebaseAdmin from "firebase-admin";
import configuration from "./configuration";

const defaultConfig = configuration().firebase;
export const firebaseConfig = firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
        clientEmail: defaultConfig.clientEmail,
        privateKey: defaultConfig.privateKey,
        projectId: defaultConfig.projectId
    }),
    projectId: defaultConfig.projectId
});