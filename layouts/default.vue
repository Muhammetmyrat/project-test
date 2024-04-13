<script setup lang="ts">
  import Toast from '@/components/Toast.vue'
</script>

<template>
  <div>
    <TheHeader />
    <div class="__container">
      <slot />
    </div>
    <Toast />
  </div>
</template>
