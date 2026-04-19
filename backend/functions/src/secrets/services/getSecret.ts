import { logger } from "firebase-functions/logger";
import { HttpsError } from "firebase-functions/v1/https";
import {
  CollectionReference,
  DocumentReference,
  FieldValue,
} from "firebase-admin/firestore";
import { isNonEmptyString } from "../utils/validation";
import { SecretDoc } from "../types/secret";

export const getSecret = async (
  secretsCollectionRef: CollectionReference,
  statsRef: DocumentReference,
  secretId: string,
): Promise<SecretDoc> => {
  const secret = await secretsCollectionRef.firestore.runTransaction(
    async (tx) => {
      const docRef = secretsCollectionRef.doc(secretId);
      const snap = await tx.get(docRef);
      if (!snap.exists) return null;

      const data = snap.data() as SecretDoc;

      if (
        !data ||
        !isNonEmptyString(data.ciphertext) ||
        !isNonEmptyString(data.iv)
      ) {
        logger.error("corrupt secret data", { secretId });
        throw new HttpsError("internal", "corrupt secret data");
      }

      if (data.expiresAt.toDate() < new Date() || data.consumed === true) {
        return null;
      }

      tx.update(docRef, { consumed: true });
      tx.set(
        statsRef,
        {
          totalSecretsConsumed: FieldValue.increment(1),
        },
        { merge: true },
      );

      return {
        ciphertext: data.ciphertext,
        iv: data.iv,
        expiresAt: data.expiresAt,
        consumed: true,
      };
    },
  );

  if (!secret) {
    logger.warn("secret not found or already consumed", { secretId });
    throw new HttpsError("not-found", "secret not found");
  }

  return secret;
};
