import { onRequest } from "firebase-functions/https";
import * as logger from "firebase-functions/logger";
import type { Response } from "express";

export const postSecret = onRequest(
  {
    region: "europe-west1",
  },
  (_, res: Response) => {
    logger.info("inside postSecret");
    res.send("hello from postSecret!");
  },
);
