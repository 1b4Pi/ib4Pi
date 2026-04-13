import { dehydrate } from "@tanstack/vue-query";
import { queryClient } from "src/boot/vueQuery";

export function useDehydrateQueryClient(ssrContext) {
  if (ssrContext) {
    ssrContext.initialState = { vueQueryState: dehydrate(queryClient) };
  }
}
