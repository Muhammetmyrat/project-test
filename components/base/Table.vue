<script setup>
  import { onMounted, onBeforeUnmount } from 'vue'

  const emit = defineEmits(['observer'])

  const handleScroll = () => {
    const table = document.querySelector('.table')
    if (table.scrollTop + table.clientHeight >= table.scrollHeight) {
      emit('observer')
    }
  }

  onMounted(() => {
    const table = document.querySelector('.table')
    table.addEventListener('scroll', handleScroll)
  })

  onBeforeUnmount(() => {
    const table = document.querySelector('.table')
    table.removeEventListener('scroll', handleScroll)
  })
</script>

<template>
  <div class="table _scrollable">
    <table id="table">
      <slot></slot>
    </table>
  </div>
</template>

<style lang="scss" scoped>
  .table {
    width: 100%;
    height: 100%;
    overflow: overlay;
    &::-webkit-scrollbar {
      width: 10px;
      height: 10px;
    }

    &::-webkit-scrollbar-track {
      background: var(--bg);
      border-radius: 5px;
      padding: 2px;
    }

    &::-webkit-scrollbar-thumb {
      background: var(--on-1);
      border-radius: 5px;
      border: 2px solid var(--bg);
    }
    table {
      width: 100%;
      border-spacing: 0px;
    }
  }
</style>
