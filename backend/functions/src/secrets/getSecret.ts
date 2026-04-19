import { HttpsError, onCall } from "firebase-functions/https";
import * as logger from "firebase-functions/logger";
import { secretsRef, statsRef } from "../firebase";
import { getSecret as getSecretService } from "../secrets/services/getSecret";
import { isNonEmptyString } from "./utils/validation";

export const getSecret = onCall(
  { enforceAppCheck: !process.env.FUNCTIONS_EMULATOR },
  async (req) => {
    const { secretId } = req.data;

    logger.info("getSecret started", { secretId });

    if (!isNonEmptyString(secretId)) {
      logger.warn("invalid secretId provided");
      throw new HttpsError(
        "invalid-argument",
        "secretId must be a non-empty string",
      );
    }

    const { ciphertext, iv } = await getSecretService(
      secretsRef,
      statsRef,
      secretId,
    );

    logger.info("retrieved secret successfully", { secretId });

    return { ciphertext, iv };
  },
);
