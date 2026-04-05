import { setGlobalOptions } from "firebase-functions";

setGlobalOptions({
  region: "europe-west1",
  minInstances: 0,
  maxInstances: 5,
  timeoutSeconds: 30,
});

export { postSecret } from "./secrets/postSecret";
export { getSecret } from "./secrets/getSecret";
