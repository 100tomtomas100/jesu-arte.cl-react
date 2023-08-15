import { initializeApp, cert} from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";

initializeApp({
  credential: cert({
    ...JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string),
    private_key: (JSON.parse(
      process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string
    )).private_key.replace(/\\n/g, "\n"),
  }),
  storageBucket: "jesu-arte.appspot.com",
});

 const bucket = getStorage().bucket();
 export default bucket;
// 'bucket' is an object defined in the @google-cloud/storage library.
// See https://googlecloudplatform.github.io/google-cloud-node/#/docs/storage/latest/storage/bucket
// for more details.
// export {}