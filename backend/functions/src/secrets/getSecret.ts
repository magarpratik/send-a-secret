import { onCall } from "firebase-functions/https";
import * as logger from "firebase-functions/logger";

export const getSecret = onCall(() => {
  logger.info("inside getSecret");
  return { message: "hello from getSecret!" };
});
