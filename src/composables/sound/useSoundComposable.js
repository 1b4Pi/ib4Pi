export default function useSoundComposable(bus, soundStore) {
  return {
    register: (composable) => {
      const { registerEvents } = composable(bus, soundStore);
      registerEvents();
    },
  };
}
