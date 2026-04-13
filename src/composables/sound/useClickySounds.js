import { onBeforeUnmount } from "vue";

export default function useClickySounds(bus, soundStore) {
  const clickySounds = () => {
    soundStore.playSound("clicky");
  };

  const registerEvents = () => {
    bus.on("clickySounds", clickySounds);
  };

  const unregisterEvents = () => {
    bus.off("clickySounds", clickySounds);
  };

  onBeforeUnmount(() => {
    unregisterEvents();
  });

  return {
    registerEvents,
  };
}
