import { Notify } from "quasar";

export function useErrorNotification() {
  function notifyError(errors) {
    if (Array.isArray(errors)) {
      errors.forEach((error) => {
        Notify.create({
          type: "negative",
          message: error,
        });
      });
    } else {
      Notify.create({
        type: "negative",
        message: errors,
      });
    }
  }

  return { notifyError };
}
