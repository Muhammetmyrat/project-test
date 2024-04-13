<script setup>
  import { useToast } from '@/stores/toast'
  const toast = useToast()
</script>
<template>
  <div id="toast">
    <template v-for="toastItem of toast.getToasts" :key="toastItem.id">
      <div class="toast__box">
        <div
          :class="[
            'toast__item',
            {
              'toast__item--warning': toastItem.status === 'warning',
              'toast__item--error': toastItem.status === 'error',
            },
          ]"
        >
          <div class="toast__content">
            <div class="toast__title">{{ toastItem.title }}</div>
            <div class="toast__text">{{ toastItem.text }}</div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
  #toast {
    position: fixed;
    right: 20px;
    top: 10px;
    z-index: 99999;
    transition: 0.3s linear;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .toast {
    // .toast__box
    &__box {
      animation: 0.3s toLeft forwards ease-out;
    }
    // .toast__item
    &__item {
      display: flex;
      min-width: 280px;
      max-width: 400px;
      padding: 20px;
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
      border-radius: 10px;
      border: 2px solid var(--blue);
      background: var(--blue);
      &--warning {
        border: 2px solid var(--yellow);
        background: var(--yellow);
      }
      &--error {
        border: 2px solid var(--red);
        background: var(--red);
      }
    }
    &__content {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 6px;
    }
    // .toast__text
    &__title {
      color: var(--on-1);
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }
    &__text {
      color: var(--on-2);
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  }
  @keyframes toLeft {
    0% {
      transform: translateX(100%);
    }
    90% {
      transform: translateX(-10px);
    }
    100% {
      transform: translateX(0);
    }
  }
</style>
