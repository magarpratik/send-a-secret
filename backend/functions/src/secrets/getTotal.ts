import { onCall } from "firebase-functions/https";
import * as logger from "firebase-functions/logger";
import { statsRef } from "../firebase";

export const getTotal = onCall(
  { enforceAppCheck: !process.env.FUNCTIONS_EMULATOR },
  async () => {
    logger.info("getTotal started");

    const statsSnapshot = await statsRef.get();
    const total = statsSnapshot.data()?.totalSecretsCreated ?? 0;

    logger.info("retrieved total successfully", { total });

    return { total };
  },
);
