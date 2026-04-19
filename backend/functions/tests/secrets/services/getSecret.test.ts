import { describe, expect, test } from "@jest/globals";
import { db } from "../../../src/firebase";
import { getSecret } from "../../../src/secrets/services/getSecret";
import { storeSecret } from "../../../src/secrets/services/storeSecret";
import { Timestamp } from "firebase-admin/firestore";

const testId = crypto.randomUUID();
const statsRef = db.collection(`test_${testId}_stats`).doc("global");
const secretsRef = db.collection(`test_${testId}_secrets`);

const currentTime = new Date();
const now = () => currentTime;

describe("CONSUME secret", () => {
  test("consume secrets and increment totalSecretsConsumed", async () => {
    const id1 = await storeSecret(secretsRef, statsRef, "cipher1", "iv1", now);
    const id2 = await storeSecret(secretsRef, statsRef, "cipher2", "iv2", now);

    const secret1 = await getSecret(secretsRef, statsRef, id1);
    expect(secret1).toEqual({
      ciphertext: "cipher1",
      iv: "iv1",
      // expires in 24 hours
      expiresAt: Timestamp.fromDate(
        new Date(currentTime.getTime() + 1000 * 60 * 60 * 24),
      ),
      consumed: true,
    });

    const snap1 = await secretsRef.doc(id1).get();
    expect(snap1.data()?.consumed).toBe(true);

    const stats1 = await statsRef.get();
    expect(stats1.data()?.totalSecretsConsumed).toBe(1);

    const secret2 = await getSecret(secretsRef, statsRef, id2);
    expect(secret2).toEqual({
      ciphertext: "cipher2",
      iv: "iv2",
      // expires in 24 hours
      expiresAt: Timestamp.fromDate(
        new Date(currentTime.getTime() + 1000 * 60 * 60 * 24),
      ),
      consumed: true,
    });

    const snap2 = await secretsRef.doc(id2).get();
    expect(snap2.data()?.consumed).toBe(true);

    const stats2 = await statsRef.get();
    expect(stats2.data()?.totalSecretsConsumed).toBe(2);
  });

  test("do not consume expired secret and do not increment totalSecretsConsumed", async () => {
    const id = await storeSecret(
      secretsRef,
      statsRef,
      "cipher-expired",
      "iv-expired",
      () => new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
    );

    const stats1 = await statsRef.get();
    const totalSecretsConsumed = stats1.data()?.totalSecretsConsumed ?? 0;

    await expect(getSecret(secretsRef, statsRef, id)).rejects.toThrow(
      "secret not found",
    );

    const stats2 = await statsRef.get();
    expect(stats2.data()?.totalSecretsConsumed ?? 0).toBe(totalSecretsConsumed);
  });
});
