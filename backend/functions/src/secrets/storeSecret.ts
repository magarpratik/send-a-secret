import { HttpsError, onCall } from "firebase-functions/https";
import { secretsRef, statsRef } from "../firebase";
import { storeSecret as storeSecretService } from "./services/storeSecret";
import { logger } from "firebase-functions/v1";
import { isNonEmptyString } from "./utils/validation";

export const storeSecret = onCall(
  { enforceAppCheck: !process.env.FUNCTIONS_EMULATOR },
  async (req) => {
    const { ciphertext, iv } = req.data;

    logger.info("storeSecret started", {
      hasCiphertext: !!ciphertext,
      hasIv: !!iv,
    });

    if (!isNonEmptyString(ciphertext)) {
      logger.warn("invalid ciphertext provided");
      throw new HttpsError(
        "invalid-argument",
        "ciphertext must be a non-empty string",
      );
    }

    if (!isNonEmptyString(iv)) {
      logger.warn("invalid iv provided");
      throw new HttpsError("invalid-argument", "iv must be a non-empty string");
    }

    const secretId = await storeSecretService(
      secretsRef,
      statsRef,
      ciphertext,
      iv,
      () => new Date(),
    );

    logger.info("secret stored successfully", { secretId });

    return { secretId };
  },
);
