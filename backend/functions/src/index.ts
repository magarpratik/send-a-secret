import { setGlobalOptions } from "firebase-functions";

setGlobalOptions({
  region: "europe-west1",
  minInstances: 0,
  maxInstances: 5,
  timeoutSeconds: 30,
});

export * from "./secrets/getSecret";
export * from "./secrets/checkSecretExists";
export * from "./secrets/storeSecret";
export * from "./secrets/getTotal";
