import { describe, expect, test } from "@jest/globals";
import { storeSecret } from "../../../src/secrets/services/storeSecret";
import { db } from "../../../src/firebase";
import { Timestamp } from "firebase-admin/firestore";

const testId = crypto.randomUUID();
const statsRef = db.collection(`test_${testId}_stats`).doc("global");
const secretsRef = db.collection(`test_${testId}_secrets`);

const currentTime = new Date("2024-01-01T00:00:00Z");
const now = () => currentTime;

describe("STORE secret", () => {
  test("store secret and increment totalSecretsCreated", async () => {
    const id = await storeSecret(secretsRef, statsRef, "cipher1", "iv1", now);

    const secretSnap = await secretsRef.doc(id).get();
    expect(secretSnap.data()).toMatchObject({
      ciphertext: "cipher1",
      iv: "iv1",
      createdAt: Timestamp.fromDate(currentTime),
    });

    const snap1 = await statsRef.get();
    expect(snap1.data()?.totalSecretsCreated).toBe(1);

    await storeSecret(secretsRef, statsRef, "cipher2", "iv2", now);
    const snap2 = await statsRef.get();
    expect(snap2.data()?.totalSecretsCreated).toBe(2);
  });
});
