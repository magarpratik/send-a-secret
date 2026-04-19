import { HttpsError, onCall } from "firebase-functions/https";
import * as logger from "firebase-functions/logger";
import { secretsRef } from "../firebase";
import { isNonEmptyString } from "./utils/validation";

export const checkSecret = onCall(
  { enforceAppCheck: !process.env.FUNCTIONS_EMULATOR },
  async (req) => {
    const { secretId } = req.data;

    logger.info("checkSecret started", { secretId });

    if (!isNonEmptyString(secretId)) {
      throw new HttpsError(
        "invalid-argument",
        "secretId must be a non-empty string",
      );
    }

    const snap = await secretsRef.doc(secretId).get();
    const exists = !snap.data()?.consumed;

    logger.info("checked secret successfully", {
      secretId,
      exists,
    });

    return { exists };
  },
);
