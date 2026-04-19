import { describe, expect, test } from "@jest/globals";
import request from "supertest";

const FUNCTION_URL =
  "http://localhost:5001/send-a-secret/europe-west1/checkSecret";

describe("Validation", () => {
  test("missing secretId", async () => {
    const response = await request(FUNCTION_URL)
      .post("/")
      .send({ data: { secretId: "   " } });

    expect(response.status).toBe(400);
    expect(response.body).toStrictEqual({
      error: {
        status: "INVALID_ARGUMENT",
        message: "secretId must be a non-empty string",
      },
    });
  });
});
