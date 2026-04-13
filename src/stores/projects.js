import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { useAppStore } from "./app";

export const useProjectsStore = defineStore("projects", () => {
  const appStore = useAppStore();
  const projects = computed(() => appStore.app.page.sections || []);
  const slide = ref(null);
  const slug = ref(null);

  const currentProject = computed(() =>
    projects.value.find(
      (section) => section.project.slug.current === slug.value
    )
  );

  const currentProjectIndex = computed(() => {
    return projects.value.findIndex(
      (section) => section.project.slug.current === slug.value
    );
  });

  const nextProject = computed(() => {
    if (projects.value.length === 0) return projects.value[0];
    const index = currentProjectIndex.value;
    const nextIndex = (index + 1) % projects.value.length;
    return projects.value[nextIndex];
  });

  const prevProject = computed(() => {
    if (projects.value.length === 0)
      return projects.value[projects.value.length - 1];
    const index = currentProjectIndex.value;
    const prevIndex =
      (index - 1 + projects.value.length) % projects.value.length;
    return projects.value[prevIndex];
  });

  return {
    currentProject,
    currentProjectIndex,
    nextProject,
    prevProject,
    projects,
    slide,
    slug,
  };
});
