import { setGlobalOptions } from "firebase-functions";

setGlobalOptions({
  region: "europe-west1",
  minInstances: 0,
  maxInstances: 5,
  timeoutSeconds: 30,
  invoker: "public",
  // ingressSettings: "ALLOW_INTERNAL_AND_GCLB",
});

export * from "./secrets/postSecret";
export * from "./secrets/getSecret";
