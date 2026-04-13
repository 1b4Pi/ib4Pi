import { boot } from "quasar/wrappers";
import Atropos from "atropos";
import "atropos/css";

export default boot(async ({ app }) => {
  app.provide("atropos", Atropos);
});
