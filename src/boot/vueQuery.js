import { boot } from "quasar/wrappers";
import { LoadingBar } from "quasar";
import { VueQueryPlugin, QueryClient } from "@tanstack/vue-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      // staleTime: 1000 * 60 * 5, // 5 minutes
      // cacheTime: 1000 * 60 * 10, // 10 minutes
      retry: false,
    },
  },
});

export default boot(async ({ app }) => {
  app.use(VueQueryPlugin, {
    queryClient,
    enableDevtoolsV6Plugin: true,
  });

  app.provide("queryClient", queryClient);

  queryClient.getQueryCache().subscribe((event) => {
    if (event.query.state.isFetching) {
      console.log("fetching")
    } else if (!event.query.state.isFetching && !event.query.state.isLoading) {
      LoadingBar.stop();
    }
  });
});

export { queryClient };
