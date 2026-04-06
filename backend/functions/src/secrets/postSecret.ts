import { onCall } from "firebase-functions/https";
import * as logger from "firebase-functions/logger";

export const postSecret = onCall(
  { enforceAppCheck: !process.env.FUNCTIONS_EMULATOR },
  () => {
    logger.info("inside postSecret");
    return { secretId: "secret-id-123" };
  },
);
