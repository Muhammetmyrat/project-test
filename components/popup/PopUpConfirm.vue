<script setup lang="ts">
  import PopUpBody from './PopUpBody.vue'

  const emits = defineEmits(['close', 'sure'])

  const close = () => {
    emits('close')
  }
</script>
<template>
  <pop-up-body :active="true" @close="close">
    <div class="menus__sure">
      <p class="menus__content">Are you sure you want to delete ?</p>
      <div class="menus__buttons">
        <button @click="close"><span>Cancel</span></button>
        <button @click="$emit('sure')"><span>Delete</span></button>
      </div>
    </div>
  </pop-up-body>
</template>

<style lang="scss" scoped>
  .menus {
    &__sure {
      display: flex;
      width: 400px;
      padding: 20px;
      flex-direction: column;
      align-items: center;
      gap: 20px;
      border-radius: 20px;
      border: 1px solid var(--onbg-1);
      background: var(--bg);
    }
    &__trash {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &__content {
      color: var(--on-1);
      text-align: center;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
    &__buttons {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      gap: 6px;
      button {
        display: flex;
        padding: 8px 12px;
        justify-content: center;
        align-items: center;
        gap: 6px;
        border-radius: 10px;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        flex: 1 0 0;
        height: 36px;
        &:first-child {
          background: var(--onbg-1);
          span {
            color: var(--on-2);
          }
        }
        &:last-child {
          background: var(--warning);
          span {
            color: var(--bg);
          }
        }
      }
    }
  }
</style>
