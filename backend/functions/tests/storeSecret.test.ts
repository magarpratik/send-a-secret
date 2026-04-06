import { describe, expect, test } from "@jest/globals";
import request from "supertest";

const FUNCTION_URL =
  "http://localhost:5001/send-a-secret/europe-west1/storeSecret";

describe("STORE secret", () => {
  test("success", async () => {
    const response = await request(FUNCTION_URL).post("/").send({ data: {} });

    expect(response.status).toBe(200);
    expect(response.body.result).toStrictEqual({
      secretId: "secret-id-123",
    });
  });
});
