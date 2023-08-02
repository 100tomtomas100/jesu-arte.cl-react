import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";
import serviceAccount from "./jesu-arte-firebase-adminsdk-sj7l5-378df69a87.json";

initializeApp({
  credential: cert(serviceAccount as ServiceAccount),
  storageBucket: "jesu-arte.appspot.com",
});

export const bucket = getStorage().bucket();

// 'bucket' is an object defined in the @google-cloud/storage library.
// See https://googlecloudplatform.github.io/google-cloud-node/#/docs/storage/latest/storage/bucket
// for more details.
// export {}