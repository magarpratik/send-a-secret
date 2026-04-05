import { setGlobalOptions } from "firebase-functions";

setGlobalOptions({ maxInstances: 5 });

export { postSecret } from "./secrets/postSecret";
export { getSecret } from "./secrets/getSecret";
