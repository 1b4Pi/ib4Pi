import { boot } from "quasar/wrappers";
import { createClient } from "@sanity/client";

const sanityClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: process.env.SANITY_API_VERSION,
  token: process.env.SANITY_CLIENT_TOKEN,
  useCdn: false,
});

export default boot(async ({ app }) => {
  app.provide("sanityClient", sanityClient);
});

export { sanityClient };
