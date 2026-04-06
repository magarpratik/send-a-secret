import { onCall } from "firebase-functions/https";
import * as logger from "firebase-functions/logger";

export const storeSecret = onCall(
  { enforceAppCheck: !process.env.FUNCTIONS_EMULATOR },
  () => {
    logger.info("inside storeSecret");
    return { secretId: "secret-id-123" };
  },
);
