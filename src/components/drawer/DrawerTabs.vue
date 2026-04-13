<template>
    <q-layout view="hhh lpR fFf" container>
        <q-header>
            <div class="q-pa-md">Christopher Quezada is a multi-disciplinary storyteller that lifts people and brands as a Writer, Producer, Director, Editor, Brand Designer, Experience Designer, UI/UX Designer, Full-Stack Developer, and Educator.</div>
            <q-tabs
                v-model="tab"
                active-color="white"
                class="text-white"
                indicator-color="dark"
                no-caps
            >
                <q-tab name="cv" label="CV" />
                <q-tab name="contact" label="Contact" />
            </q-tabs>
        </q-header>
         <q-page-container>
            <q-page>
                <q-scroll-area class="absolute-full mask-overflow-b-drawer">
                    <q-tab-panels v-model="tab" animated>
                        <q-tab-panel name="cv">
                            <cv-items />
                        </q-tab-panel>
                        <q-tab-panel name="contact">
                            <q-list dense padding>
                                <q-item-label class="text-caption" header>Call / Text</q-item-label>
                                <q-item class="text-caption" header>
                                (248) 705-8990
                                </q-item>
                                <q-item-label class="text-caption" header>Email</q-item-label>
                                <q-item class="text-caption" header>
                                    <q-btn
                                        v-if="!revealed"
                                        class="text-white bg-primary border-none cursor-pointer"
                                        unelevated
                                        no-caps
                                        q-pa-none
                                        @click="revealEmail"
                                    >
                                        Email me
                                    </q-btn>
                                    <a
                                        v-else
                                        class="text-white"
                                        :href="`mailto:${email}`"
                                    >
                                        {{ email }}
                                    </a>
                                </q-item>
                            </q-list>
                        </q-tab-panel>
                    </q-tab-panels>
                </q-scroll-area>
            </q-page>
         </q-page-container>
    </q-layout>
</template>
<script setup>
import { ref } from "vue";
import { i18n } from "src/boot/i18n";
import CvItems from "../cv/CvItems.vue";

defineOptions({ name: "DrawerTabs" });

const { t } = i18n.global;
const revealed = ref(false);
const email = ref('');
const tab = ref("cv");
function revealEmail () {
  email.value = ['usemarkers', '@', 'gmail.com'].join('')
  revealed.value = true
}
</script>