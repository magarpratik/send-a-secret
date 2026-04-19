import { HttpsError, onCall } from "firebase-functions/https";
import * as logger from "firebase-functions/logger";
import { secretsRef } from "../firebase";
import { isNonEmptyString } from "./utils/validation";
import { checkSecretExists as checkSecretsExistsService } from "./services/checkSecretExists";

export const checkSecretExists = onCall(
  { enforceAppCheck: !process.env.FUNCTIONS_EMULATOR },
  async (req) => {
    const { secretId } = req.data;

    logger.info("checkSecretExists started", { secretId });

    if (!isNonEmptyString(secretId)) {
      throw new HttpsError(
        "invalid-argument",
        "secretId must be a non-empty string",
      );
    }

    const exists = await checkSecretsExistsService(secretsRef.doc(secretId));

    logger.info("checked secret exists successfully", {
      secretId,
      exists,
    });

    return { exists };
  },
);
