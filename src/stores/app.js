import { ref, computed } from "vue";
import { useWindowFocus } from "@vueuse/core";
import { defineStore } from "pinia";

export const useAppStore = defineStore("app", () => {
    const app = ref({});
    const drawer = ref(false);
    const userInteracted = ref(false);
    const focused = useWindowFocus() || true;

    return {
        app,
        drawer,
        focused,
        userInteracted
    }
});