import { useMotion } from "@vueuse/motion";
import { useAnimation } from "./useAnimation";

export function useHover(refElement) {
  const { spring } = useAnimation();

  const setupMotion = () => {
    const motionInstance = useMotion(refElement, {
      initial: {
        scale: 1,
      },
      hover: {
        scale: 1.1,
        transition: spring,
      },
      leave: {
        scale: 1,
        transition: spring,
      },
    });
    return motionInstance;
  };

  return { setupMotion };
}
