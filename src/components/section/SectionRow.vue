<template>
    <div :id="section.slug.current">
        <router-link
            class="no-text-underline"
            :class="{ 'no-cursor-pointer': active }"
            :to="
              active
                ? { path: '/' }
                : {
                    name: 'section',
                    params: { section: section.slug.current },
                  }
            "
            style="display: block; min-height: 113px;"
          >
            <div
                class="atropos overflow-visible"
                ref="atroposRef"
            >
                <div class="atropos-scale overflow-visible">
                    <div class="atropos-rotate overflow-visible">
                        <div class="atropos-inner overflow-visible">   
                            <div
                                class="full-width overflow-hidden relative-position"
                                style="min-height: 113px;"
                                :style="styleNav"
                            >
                                <section-row-media 
                                    :active="active"
                                    :height="height"
                                    :hover="hover"
                                    :length="length" 
                                    :section="section" 
                                    :width="width"
                                />
                                <div
                                :class="[
                                    $q.screen.lt.md ? 'q-pl-md' : 'q-pl-xl',
                                    active
                                    ? `items-start ${$q.screen.lt.md ? 'q-py-lg' : 'q-py-xl'}`
                                    : 'items-center',
                                ]"
                                class="absolute-full atropos-label justify-between row z-top"
                                data-atropos-offset="10"
                                ref="labelRef"
                                :style="
                                    active
                                    ? {
                                        position: 'sticky',
                                        marginTop: `calc(${-width}px / ${
                                            section.project.ratio || 16 / 9
                                        })`,
                                        top: 0,
                                        }
                                    : null
                                "
                                >
                                    <section-row-label
                                        v-if="!active"
                                        :active="active"
                                        class="cursor-pointer"
                                        :hover="active || hover"
                                        :section="section"
                                    />
                                </div>
                            </div>  
                            <div class="bg-primary text-white q-px-md q-py-md" v-if="active">
                                <mark
                                    :class="[
                                    $q.screen.lt.md ? 'text-h6' : 'text-h5',
                                    ]"
                                    class="bg-primary q-pa-md text-white"
                                    >{{ section.title
                                    }}
                                    <q-icon
                                        :class="{ 'rotate-90': active }"
                                        color="white"
                                        name="chevron_right"
                                    />
                                </mark>
                                <div class="row q-pt-md">
                                    <div class="col col-xs-12 col-sm-6 q-px-md"> 
                                        <p v-if="section.project.description" class="text-body1" style="max-width: 60ch;">{{ section.project.description }}</p>
                                    </div>
                                    <div class="col col-xs-12 col-sm-6 q-px-md">
                                        <p v-if="section.project.roles" class="text-subtitle2">{{ section.project.roles }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </router-link>
    </div>
</template>

<script setup>
import { computed, inject, nextTick, onMounted, ref, watch } from "vue";
import SectionRowLabel from "./SectionRowLabel.vue";
import SectionRowMedia from "./SectionRowMedia.vue";

defineOptions({ name: "SectionRow" });

const props = defineProps({
  active: { type: Boolean, default: false },
  length: { type: Number, default: 7 },
  section: {
    type: Object,
    default: () => ({}),
  },
  height: { type: Number, default: 960 },
  width: { type: Number, default: 480 },
});

const atropos = inject("atropos");

const atroposRef = ref(null);
const hover = ref(false);

const rotateXMax = computed(() => (props.active ? 5 : 15))
const rotateYMax = computed(() => (props.active ? 2 : 22))
const styleNav = computed(() => ({
  height: props.active
    ? `calc(${props.width}px / ${props.section.project.ratio || 16 / 9})`
    : `${props.height}px`,
}))

let myAtropos;

const checkActive = async () => {
  await nextTick();
  if (props.active) {
    if (myAtropos) {
      myAtropos.params.activeOffset = 0;
      myAtropos.params.rotate = false;
      resetTransformations();
    }
  } else {
    myAtropos.params.activeOffset = 50;
    myAtropos.params.rotate = true;
  }
};

const createAtropos = async () => {
  await nextTick();
  myAtropos = atropos({
    el: atroposRef.value,
    highlight: false,
    rotateTouch: "scroll-y",
    rotateXMax: rotateXMax.value,
    rotateYMax: rotateYMax.value,
    onEnter() {
      hover.value = true;
    },
    onLeave() {
      hover.value = false;
    },
  });
};

const resetTransformations = () => {
  const el = atroposRef.value;
  if (el) {
    const rotateEl = el.querySelector(".atropos-rotate");
    if (rotateEl) {
      rotateEl.style.transform =
        "translate3d(0%, 0%, 0px) rotateX(0deg) rotateY(0deg)";
    }
    const scaleEl = el.querySelector(".atropos-scale");
    if (scaleEl) {
      scaleEl.style.transform = "translate3d(0px, 0px, 0px)";
    }
    const labelEl = el.querySelector(".atropos-label");
    if (labelEl) {
      labelEl.style.transform = "translate3d(0px, 0px, 0px)";
    }
  }
};

onMounted(() => {
  createAtropos();
  checkActive();
});

watch(
  [rotateXMax, rotateYMax, () => props.active],
  async ([x, y, isActive]) => {
    
    if (!myAtropos) return;
    myAtropos.params.rotateXMax = x;
    myAtropos.params.rotateYMax = y;
    myAtropos.params.activeOffset = isActive ? 0 : 50;
    myAtropos.params.rotate = !isActive;
    await nextTick();
    if (isActive) {
      resetTransformations();
    }
  },
  { immediate: true }
)

// watch(() => props.active, (active) => {
//   if (active) {
//     console.log("active", props.section.project.description, props.section.project.roles)
//   }
// }, { immediate: true})

</script>