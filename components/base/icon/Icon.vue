<script setup>
import { computed } from "vue";
import icons from "./icons";

const props = defineProps({
  name: { type: String, default: () => "" },
});

const path = computed(() => {
  return icons[props.name];
});
</script>

<template>
  <span class="icon" v-html="path"></span>
</template>

<style lang="scss" scoped>
.icon {
  display: flex;
}
</style>
