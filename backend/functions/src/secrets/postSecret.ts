import { onCall } from "firebase-functions/https";
import * as logger from "firebase-functions/logger";

export const postSecret = onCall(() => {
  logger.info("inside postSecret");
  return { secretId: "secret-id-123" };
});
