import { watch } from "vue";

export function useUpdateStoreFromQuery(queryDataRef, storeDataRef) {
  watch(queryDataRef, (newData) => {
    if (newData) {
      storeDataRef.value = { ...newData };
    }
  });
}
