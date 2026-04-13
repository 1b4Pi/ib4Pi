import { watch } from "vue";
import { Notify } from "quasar";

export function useQueryErrorHandler(errorRef, isErrorRef) {
  watch(isErrorRef, (isError) => {
    if (isError && errorRef.value) {
      Notify.create({
        type: "negative",
        message: errorRef.value.message || "An error occurred",
      });
    }
  });
}
