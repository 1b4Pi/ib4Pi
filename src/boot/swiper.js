import { boot } from "quasar/wrappers";
import { register } from "swiper/element";
import {
  Autoplay,
  EffectFade,
  Keyboard,
  Mousewheel,
  Navigation,
  Pagination,
} from "swiper/modules";
import EffectMaterial from "src/swiper/material/effect-material.esm";
import "src/swiper/material/effect-material.scss";

export default boot(async () => {
  register();
});

export {
  Autoplay,
  EffectFade,
  EffectMaterial,
  Keyboard,
  Mousewheel,
  Navigation,
  Pagination,
};
