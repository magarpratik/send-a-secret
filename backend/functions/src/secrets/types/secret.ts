import { Timestamp } from "firebase-admin/firestore";

export type SecretDoc = {
  ciphertext: string;
  iv: string;
  expiresAt: Timestamp;
  consumed?: boolean;
};