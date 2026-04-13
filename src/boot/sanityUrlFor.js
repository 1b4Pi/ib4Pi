import { boot } from "quasar/wrappers";
import { sanityClient } from "./sanity";
import { createImageUrlBuilder } from '@sanity/image-url'

const builder = createImageUrlBuilder(sanityClient.config())

function urlFor(source) {
  return builder.image(source);
}

export default boot(async ({ app }) => {
  app.provide("urlFor", urlFor);
});

export { urlFor };
