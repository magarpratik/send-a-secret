import { describe, expect, test } from "@jest/globals";
import request from "supertest";

const FUNCTION_URL =
  "http://localhost:5001/send-a-secret/us-central1/getSecret";

describe("GET secret", () => {
  test("success", async () => {
    const response = await request(FUNCTION_URL).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toBe("hello from getSecret!");
  });
});
