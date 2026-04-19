import { DocumentReference } from "firebase-admin/firestore";

export const checkSecretExists = async (
  secretRef: DocumentReference,
): Promise<boolean> => {
  const snap = await secretRef.get();
  const data = snap.data();

  const exists =
    !!data &&
    data.consumed !== true &&
    data.expiresAt?.toDate?.() > new Date();

  return exists;
};
