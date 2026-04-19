import { onCall } from "firebase-functions/https";
import * as logger from "firebase-functions/logger";
import { statsRef } from "../firebase";

export const getTotalSecretsSent = onCall(
  { enforceAppCheck: !process.env.FUNCTIONS_EMULATOR },
  async () => {
    logger.info("getTotalSecretsSent started");

    const statsSnapshot = await statsRef.get();
    const total = statsSnapshot.data()?.totalSecretsCreated ?? 0;

    logger.info("retrieved total secrets sent successfully", { total });

    return { total };
  },
);
