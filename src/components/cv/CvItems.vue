<template>
  <q-list v-if="app.cv" class="q-pr-lg" dense padding>
    <q-item-label class="text-caption" header>Experience</q-item-label>
    <cv-item v-for="item in app.cv.experience" :data="item" :key="item._key" />
    <q-item-label class="text-caption" header>Educator</q-item-label>
    <q-item v-for="item in app.cv.educator" class="q-mb-lg" :key="item._key">
      <q-item-section>
        <q-item-label caption class="text-white">
          {{ item.title }} / {{ item.location }}
        </q-item-label>
        <q-item-label caption class="q-pb-sm">
          {{ item.date }} / Adjunct Professor
        </q-item-label>
        <q-item-label v-for="course in item.course" caption :key="course._key">
          {{ course.title }}
        </q-item-label>
      </q-item-section>
    </q-item>
    <q-item-label class="text-caption" header>Education</q-item-label>
    <q-item>
      <q-item-section>
        <q-item-label caption class="text-white">
          {{ app.cv.education.title }} / {{ app.cv.education.location }}
        </q-item-label>
        <q-item-label caption>
          {{ app.cv.education.date }}
        </q-item-label>
        <q-item-label caption>
          {{ app.cv.education.description }}
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useAppStore } from "src/stores/app";
import CvItem from "./CvItem.vue";

defineOptions({ name: "CvItems" });

const appStore = useAppStore();
const { app } = storeToRefs(appStore);
</script>
