import { computed } from "vue";
import { Screen } from "quasar";

export function useResponsiveImageWidth(mdWidth) {
  const computedWidth = computed(() => {
    const hrWidth = mdWidth * 3;
    if (Screen.xs) {
      return hrWidth;
    } else if (Screen.sm) {
      return hrWidth * 0.75;
    } else if (Screen.md) {
      return hrWidth;
    } else if (Screen.lg) {
      return hrWidth * 1.25;
    } else if (Screen.xl) {
      return hrWidth * 1.5;
    } else {
      return hrWidth;
    }
  });

  return computedWidth.value;
}
