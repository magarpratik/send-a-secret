import { describe, expect, test } from "@jest/globals";
import { db } from "../../../src/firebase";
import { checkSecretExists } from "../../../src/secrets/services/checkSecretExists";
import { storeSecret } from "../../../src/secrets/services/storeSecret";

const testId = crypto.randomUUID();
const secretsRef = db.collection(`test_${testId}_secrets`);
const statsRef = db.collection(`test_${testId}_stats`).doc("global");

describe("CHECK secret exists", () => {
  test("returns false for expired secret", async () => {
    const id = await storeSecret(
      secretsRef,
      statsRef,
      "cipher-expired",
      "iv-expired",
      () => new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
    );

    const result = await checkSecretExists(secretsRef.doc(id));

    expect(result).toBe(false);
  });
});
