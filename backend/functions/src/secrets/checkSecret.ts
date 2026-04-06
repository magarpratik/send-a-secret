import { onCall } from "firebase-functions/https";
import * as logger from "firebase-functions/logger";

export const checkSecret = onCall(
  { enforceAppCheck: !process.env.FUNCTIONS_EMULATOR },
  () => {
    logger.info("inside checkSecret");
    return { exists: true };
  },
);
