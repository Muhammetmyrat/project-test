<script setup>
  const props = defineProps({
    sticky: {
      type: Boolean,
      default: false,
    },
    items: {
      type: Array,
      default: () => [],
    },
  })
</script>

<template>
  <thead :class="['table__head', { 'table__head--sticky': props.sticky }]">
    <tr>
      <slot name="prev"></slot>
      <th v-for="item in items" :id="item.id" :key="item.id" class="relative">
        <div class="table__head-item">
          <p>{{ item.name }}</p>
        </div>
      </th>
      <slot name="next"></slot>
      <slot></slot>
    </tr>
  </thead>
</template>

<style lang="scss">
  .relative {
    position: relative;
  }
  .table__head {
    &--sticky {
      position: sticky;
      top: 0px;
      z-index: 1;
      border-radius: 6px 6px 0px 0px;
      &::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 6px;
        left: 0;
        top: -3px;
        background-color: var(--bg);
        z-index: 1;
      }
    }
    tr {
      position: relative;

      th {
        background-color: var(--bg);
        z-index: 2;
        text-align: center;
        position: relative;
        border-bottom: 1px solid var(--onbg-1);
        &:not(:last-child) {
          .table__head-item {
            p {
              &:after {
                content: '';
                position: absolute;
                right: 10px;
                width: 1px;
                height: 20px;
                background-color: var(--onbg-1);
              }
            }
          }
        }
        .table__sort-button {
          display: flex;
          gap: 5px;
          align-items: center;
          justify-content: center;
          width: 100%;
          background-color: transparent;
          padding: 14px 10px;
        }
        .table__head-item {
          width: 100%;
          display: flex;
          padding-bottom: 12px;
          justify-content: space-between;
          align-items: flex-start;
          border-bottom: 1px solid var(--bg-70);
          position: relative;
        }
        p {
          color: var(--on-1);
          font-size: 14px;
          font-style: normal;
          font-weight: 500;
          line-height: normal;
          padding-right: 2px;
          width: max-content;
        }
        span {
          color: var(--on-1);
          display: flex;
          align-items: center;
        }
      }
    }
  }
</style>
