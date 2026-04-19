import { describe, expect, test } from "@jest/globals";
import { db } from "../../../src/firebase";
import { getSecret } from "../../../src/secrets/services/getSecret";
import { storeSecret } from "../../../src/secrets/services/storeSecret";

const testId = crypto.randomUUID();
const statsRef = db.collection(`test_${testId}_stats`).doc("global");
const secretsRef = db.collection(`test_${testId}_secrets`);

const now = () => new Date();

describe("CONSUME secret", () => {
  test("consume secrets and increment totalSecretsConsumed", async () => {
    const id1 = await storeSecret(secretsRef, statsRef, "cipher1", "iv1", now);
    const id2 = await storeSecret(secretsRef, statsRef, "cipher2", "iv2", now);

    const secret1 = await getSecret(secretsRef, statsRef, id1);
    expect(secret1).toMatchObject({
      ciphertext: "cipher1",
      iv: "iv1",
      consumed: true,
    });

    const snap1 = await secretsRef.doc(id1).get();
    expect(snap1.data()?.consumed).toBe(true);

    const stats1 = await statsRef.get();
    expect(stats1.data()?.totalSecretsConsumed).toBe(1);

    const secret2 = await getSecret(secretsRef, statsRef, id2);
    expect(secret2).toMatchObject({
      ciphertext: "cipher2",
      iv: "iv2",
      consumed: true,
    });

    const snap2 = await secretsRef.doc(id2).get();
    expect(snap2.data()?.consumed).toBe(true);

    const stats2 = await statsRef.get();
    expect(stats2.data()?.totalSecretsConsumed).toBe(2);
  });
});
