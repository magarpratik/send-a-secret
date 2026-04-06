import { onCall } from "firebase-functions/https";
import * as logger from "firebase-functions/logger";

export const getSecret = onCall({ enforceAppCheck: true }, () => {
  logger.info("inside getSecret");
  return { ciphertext: "encrypted-secret" };
});
