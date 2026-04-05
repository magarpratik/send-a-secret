import { onRequest } from "firebase-functions/https";
import * as logger from "firebase-functions/logger";
import type { Request, Response } from "express";

export const postSecret = onRequest((req: Request, res: Response) => {
  logger.info("inside postSecret");
  res.send("hello from postSecret!");
});
