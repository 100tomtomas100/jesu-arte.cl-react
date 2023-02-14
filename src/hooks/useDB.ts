import { useEffect, useState } from "react";
import { db } from "../utils/firebase";
import { getDoc, doc, DocumentSnapshot, DocumentData, DocumentReference } from "firebase/firestore";

const useDB = () => {
  const [reviews, setReviews] = useState<{[key: string]: unknown}[]>([]);

  useEffect(() => {
    //get reviews from database
    (async () => {
      const docRef: DocumentReference<DocumentData> = doc(
        db,
        "reviews/reviews"
      );
      const docSnap: DocumentSnapshot<DocumentData> = await getDoc(docRef);
      if (docSnap.exists()) {
        setReviews(docSnap.data().reviews.reviews);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    })();
  }, []);
  return reviews;
};

export default useDB;
