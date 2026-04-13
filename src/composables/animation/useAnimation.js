import { reactive } from "vue";

export function useAnimation() {
  const spring = reactive({
    type: "spring",
    stiffness: 300,
    damping: 20,
  });

  const createSpring = (stiffness = 300, damping = 20, delay = 1000) => ({
    type: "spring",
    stiffness,
    damping,
    delay,
  });

  return {
    spring,
    createSpring,
  };
}
