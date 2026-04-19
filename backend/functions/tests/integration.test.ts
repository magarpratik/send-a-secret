import { describe, expect, test } from "@jest/globals";
import request from "supertest";

const baseUrl = "http://localhost:5001/send-a-secret/europe-west1";

describe("Secret lifecycle", () => {
  test("Store - Check - Consume - Check again", async () => {
    const ciphertext = "encrypted-secret";
    const iv = "initialization-vector";

    // GET total secrets sent
    const total1 = await request(`${baseUrl}/getTotalSecretsSent`)
      .post("/")
      .send({ data: {} });
    
    expect(total1.body.result).toEqual({ total: 0 });

    // STORE secret
    const store = await request(`${baseUrl}/storeSecret`)
      .post("/")
      .send({ data: { ciphertext, iv } });

    const secretId = store.body.result.secretId;

    // CHECK secret exists
    const check1 = await request(`${baseUrl}/checkSecretExists`)
      .post("/")
      .send({ data: { secretId } });
    
    expect(check1.body.result).toEqual({ exists: true });

    // CONSUME secret
    const get = await request(`${baseUrl}/getSecret`)
      .post("/")
      .send({ data: { secretId } });
    
    expect(get.body.result).toEqual({ ciphertext, iv });

    // CHECK again (should not exist)
    const check2 = await request(`${baseUrl}/checkSecretExists`)
      .post("/")
      .send({ data: { secretId } });
    
    expect(check2.body.result).toEqual({ exists: false });

    // CONSUME again (should return not-found)
    const getAgain = await request(`${baseUrl}/getSecret`)
      .post("/")
      .send({ data: { secretId } });
    
    expect(getAgain.status).toBe(404);
    expect(getAgain.body).toEqual({
      error: {
        status: "NOT_FOUND",
        message: "secret not found",
      },
    });

    // GET total secrets sent again
    const total2 = await request(`${baseUrl}/getTotalSecretsSent`)
      .post("/")
      .send({ data: {} });
    
    expect(total2.body.result).toEqual({ total: 1 });
  }, 20000);
});
