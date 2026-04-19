import {
  CollectionReference,
  DocumentReference,
  FieldValue,
} from "firebase-admin/firestore";
import { db } from "../../firebase";

export const storeSecret = async (
  secretsCollectionRef: CollectionReference,
  statsRef: DocumentReference,
  ciphertext: string,
  iv: string,
  now: () => Date,
): Promise<string> => {
  const batch = db.batch();
  const id = crypto.randomUUID();
  const secretRef = secretsCollectionRef.doc(id);

  batch.set(secretRef, {
    ciphertext,
    iv,
    createdAt: now(),
  });

  batch.set(
    statsRef,
    {
      totalSecretsCreated: FieldValue.increment(1),
    },
    { merge: true },
  );

  await batch.commit();
  return id;
};
