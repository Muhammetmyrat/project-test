<script setup lang="ts">
  import PopUpBody from './PopUpBody.vue'

  const emits = defineEmits(['close', 'sure'])

  const props = defineProps({
    source: {
      type: String,
      default: '',
    },
    width: {
      type: Number,
      default: 0,
    },
    height: {
      type: Number,
      default: 0,
    },
    pages: {
      type: Number,
      default: 0,
    },
  })

  const close = () => {
    emits('close')
  }
</script>

<template>
  <pop-up-body :active="true" :popUpWidth="`${width + 200}`" @close="close">
    <div class="pdf-edit" :style="{ height: `${Number(height * pages) + 200}px` }">
      <div class="pdf-edit__wrapper">
        <PdfEmbed :source="source" :width="width" :height="height" />
      </div>
    </div>
  </pop-up-body>
</template>

<style lang="scss" scoped>
  .pdf-edit {
    width: 100%;
    padding: 20px;
    border-radius: 20px;
    border: 1px solid var(--onbg-1);
    background: var(--bg);
    &__wrapper {
      width: 100%;
      height: 100%;
    }
  }
</style>
