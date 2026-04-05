import { onRequest } from "firebase-functions/https";
import * as logger from "firebase-functions/logger";
import type { Request, Response } from "express";

export const getSecret = onRequest((req: Request, res: Response) => {
  logger.info("inside getSecret");
  res.send("hello from getSecret!");
});
