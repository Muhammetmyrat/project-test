<script setup>
  const props = defineProps({
    items: {
      type: [Array, Object],
      default: () => [],
    },
    active: {
      type: Boolean,
      default: () => false,
    },
  })
</script>

<template>
  <tr :class="['table__row', { active: props.active }]">
    <slot name="prev"></slot>
    <td v-for="(item, index) in items" :key="index">{{ item }}</td>
    <slot></slot>
  </tr>
</template>

<style lang="scss">
  .table__row {
    cursor: pointer;
    &:not(:first-child) {
      td {
        padding-top: 16px;
      }
    }
    &:first-child {
      td {
        padding-top: 30px;
      }
    }
    td {
      color: var(--on-1);
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      transition: all 0.3s ease 0s;
      text-align: left;
      width: fit-content;
      position: relative;
      padding-bottom: 12px;
      border-bottom: 1px solid var(--onbg-1);
      &:not(:last-child)::after {
        content: '';
        position: absolute;
        right: 10px;
        top: 70%;
        transform: translateY(-70%);
        width: 1px;
        height: 40px;
        background-color: var(--onbg-1);
      }
    }
    &:nth-child(even) {
      td {
        background-color: var(--onbg-1);
      }
    }
  }
</style>
