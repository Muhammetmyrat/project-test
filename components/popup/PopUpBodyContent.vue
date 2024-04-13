<script setup lang="ts">
  import MyButton from '../base/MyButton.vue'

  const emits = defineEmits(['close'])
</script>
<template>
  <div class="content" @click.stop>
    <div class="content__wrapper">
      <div class="content__close">
        <my-button :title="'Close'" :padding="'8px 14px 8px 12px'" prev-icon="close" @click.stop="$emit('close')"></my-button>
      </div>
      <div class="content__body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .content {
    &__wrapper {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      overflow: hidden;
      gap: 10px;
    }
    &__close {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    &__body {
      width: 100%;
    }
  }
</style>
