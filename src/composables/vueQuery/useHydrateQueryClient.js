import { onMounted } from "vue";
import { hydrate } from "@tanstack/vue-query";
import { queryClient } from "src/boot/vueQuery";

export function useHydrateQueryClient() {
  onMounted(() => {
    const initialState = window.__INITIAL_STATE__?.vueQueryState;
    if (initialState) {
      hydrate(queryClient, initialState);
    }
  });
}
