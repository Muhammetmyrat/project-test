<script setup lang="ts">
  import PopUpBodyContent from './PopUpBodyContent.vue'

  const emits = defineEmits(['close'])

  const props = defineProps({
    popUpWidth: {
      type: String,
      default: () => '400',
    },
    active: {
      type: Boolean,
      default: () => false,
    },
  })

  const close = () => {
    emits('close')
  }
</script>

<template>
  <div :class="['pop-up', { active: props.active }]" @click.stop="close">
    <div class="pop-up__wrapper" :style="{ 'max-width': `${popUpWidth}px` }">
      <div class="pop-up__body">
        <pop-up-body-content @close="close">
          <slot></slot>
        </pop-up-body-content>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .pop-up {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-x: hidden;
    overflow-y: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 1;
    z-index: 100;
    opacity: 0;
    visibility: hidden;
    z-index: 99;
    user-select: none;
    transition: all 0.3s ease;
    padding-left: 20px;
    padding-right: 20px;
    &.active {
      opacity: 1;
      z-index: 1000;
      visibility: visible;
      background: var(--bg-inverted-70);
      -webkit-backdrop-filter: blur(15px);
      -moz-backdrop-filter: blur(15px);
      backdrop-filter: blur(15px);
      pointer-events: auto;
      .pop-up__body {
        transform: scale(1);
        transition: all 0.3s ease;
      }
    }
    &::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }

    &::-webkit-scrollbar-track {
      background: var(--bg);
      border-radius: 4px;
      padding: 2px;
    }

    &::-webkit-scrollbar-thumb {
      background: var(--on-1);
      border-radius: 4px;
      border: 2px solid var(--bg);
    }
    &__wrapper {
      padding: 20px;
      width: 100%;
      flex: 1 0 auto;
      margin: auto 0;
      padding: 20px 0;
      box-sizing: border-box;
      transition: all 0.2s;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    &__body {
      position: relative;
      transition: all 0.3s ease;
      transform: scale(0);
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }
</style>
