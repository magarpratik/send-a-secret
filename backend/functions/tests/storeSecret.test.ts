import { describe, expect, test } from "@jest/globals";
import request from "supertest";

const FUNCTION_URL =
  "http://localhost:5001/send-a-secret/europe-west1/storeSecret";

describe("Validation", () => {
  test.concurrent("missing ciphertext", async () => {
    const response = await request(FUNCTION_URL)
      .post("/")
      .send({
        data: {
          iv: "initialization-vector",
          ciphertext: "   ",
        },
      });

    expect(response.status).toBe(400);
    expect(response.body).toStrictEqual({
      error: {
        status: "INVALID_ARGUMENT",
        message: "ciphertext must be a non-empty string",
      },
    });
  });

  test.concurrent("missing iv", async () => {
    const response = await request(FUNCTION_URL)
      .post("/")
      .send({
        data: {
          ciphertext: "encrypted-secret",
          iv: "   ",
        },
      });

    expect(response.status).toBe(400);
    expect(response.body).toStrictEqual({
      error: {
        status: "INVALID_ARGUMENT",
        message: "iv must be a non-empty string",
      },
    });
  });
});
