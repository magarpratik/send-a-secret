import { onRequest } from "firebase-functions/https";
import * as logger from "firebase-functions/logger";
import type { Response } from "express";

export const getSecret = onRequest(
  {
    region: "europe-west1",
  },
  (_, res: Response) => {
    logger.info("inside getSecret");
    res.send("Hello from getSecret!");
  },
);
