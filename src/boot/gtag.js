import { boot } from "quasar/wrappers";
import VueGtag, { event } from "vue-gtag";

export default boot(async ({ app, router }) => {
  app.use(
    VueGtag,
    {
      config: { id: "G-D644CSN7TQ" },
      debug_mode: false,
      onBeforeTrack() {
        // console.log("BEFORE");
      },
      onAfterTrack() {
        // console.log("AFTER");
      },
      onReady() {
        // console.log("READY");
      },
    },
    router
  );
});

export { event };
