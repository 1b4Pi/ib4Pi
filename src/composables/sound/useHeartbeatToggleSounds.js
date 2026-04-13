import { onBeforeUnmount } from "vue";

export default function useHearbeatToggleSounds(bus, soundStore) {
  const heartbeatToggleSounds = () => {
    soundStore.playSound("heartbeatToggle");
  };

  const registerEvents = () => {
    bus.on("heartbeatToggleSounds", heartbeatToggleSounds);
  };

  const unregisterEvents = () => {
    bus.off("heartbeatToggleSounds", heartbeatToggleSounds);
  };

  onBeforeUnmount(() => {
    unregisterEvents();
  });

  return {
    registerEvents,
  };
}
