<script setup>
  import { computed } from 'vue'
  import Icon from './icon/Icon.vue'
  import Avatar from '@/components/base/Avatar.vue'

  const props = defineProps({
    title: { type: String, default: null },
    titleColor: { type: String, default: null },
    prevIcon: { type: String, default: null },
    prevIconColor: { type: String, default: null },
    appendIcon: { type: String, default: null },
    appendIconColor: { type: String, default: null },
    active: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    outline: { type: Boolean, default: false },
    block: { type: Boolean, default: false },
    small: { type: Boolean, default: false },
    large: { type: Boolean, default: false },
    soft: { type: Boolean, default: false },
    hover: { type: Boolean, default: false },
    hoverBg: { type: Boolean, default: false },
    hoverBgHover: { type: Boolean, default: false },
    hoverBgHoverNot: { type: Boolean, default: false },
    noBorder: { type: Boolean, default: false },
    borderRadius: { type: Number, default: 10 },
    borderColor: { type: Boolean, default: false },
    onlyIcon: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    padding: { type: String, default: '13px 12px' },
    background: { type: String, default: 'var(--clear)' },
    type: { type: String, default: null },
    width: { type: String, default: null },
    height: { type: String, default: 'max-content' },
    avatar: { type: Boolean, default: false },
    user: { type: Object, default: null },
  })

  const classes = computed(() => [
    'button',
    {
      button_block: props.block,
      button_outline: props.outline,
      button_disabled: props.disabled,
      button_soft: props.soft,
      button_loading: props.loading,
      button_active: props.active,
      button_hover: props.hover ? (props.active ? false : true) : false,
      'button_hover-bg-hover': props.hoverBgHover ? (props.active || props.hoverBgHoverNot ? false : true) : false,
      'button_hover-bg': props.hoverBg ? (props.active ? false : true) : false,
      'button_only-icon': props.onlyIcon,
    },
  ])
  const styles = computed(() => {
    let obj = {
      background: props.background,
      height: props.height,
    }
    if (props.borderRadius) {
      obj = {
        ...obj,
        'border-radius': `${props.borderRadius}px`,
      }
    }
    if (props.borderColor) {
      obj = {
        ...obj,
        border: '1.2px solid var(--onbg-1)',
      }
    }
    if (props.width) {
      obj = {
        ...obj,
        width: props.width,
      }
    }
    if (props.padding) {
      obj = {
        ...obj,
        padding: props.padding,
      }
    }
    return obj
  })
</script>

<template>
  <button :class="classes" :disabled="props.disabled" :type="type" :style="styles">
    <avatar v-if="props.avatar" :name="user.fullName ? user.fullName : user.userName" :image="user.avatar"></avatar>
    <span v-if="props.prevIcon && !props.avatar" class="button__icon-left">
      <Icon
        :name="props.prevIcon"
        :style="{
          color: props.prevIconColor ? props.prevIconColor : null,
        }"
      />
    </span>
    <span
      v-if="props.title"
      class="button__content"
      :style="{
        color: props.titleColor ? `var(--${props.titleColor}) !important` : null,
      }"
    >
      {{ props.title }}
    </span>
    <span v-if="props.appendIcon" class="button__icon-right">
      <Icon
        :name="props.appendIcon"
        :style="{
          color: props.appendIconColor ? `var(--${props.appendIconColor})` : null,
        }"
      />
    </span>
  </button>
</template>

<style lang="scss" scoped>
  .button {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6px;
    border: 0;
    outline: none;
    transition: all 0.3s ease;
    @media screen and (max-width: $mobile) {
      cursor: none !important;
      user-select: none;
    }
    //   z-index: 0;
    //   &::before,
    //   &::after {
    //     content: "";
    //     position: absolute;
    //     z-index: -1;
    //   }
    //   &::before {
    //     border-radius: 4% / 50%;
    //     background-color: var(--bg-inverted);
    //     top: 0px;
    //     bottom: 0px;
    //     right: 0px;
    //     left: 0px;
    //   }

    //   &::after {
    //     border-radius: 50% / 5%;
    //     background-color: var(--bg-inverted);
    //     top: -2px;
    //     bottom: -2px;
    //     right: 10px;
    //     left: 10px;
    //   }
    // .button__icon-left
    &__icon-left {
      span {
        color: var(--on-2);
      }
    }
    // .button__content
    &__content {
      color: var(--on-2);
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }

    // .button__icon-right
    &__icon-right {
      span {
        color: var(--on-2);
      }
    }
    &_only-icon {
      padding: 8px !important;
    }
    &.button_disabled {
      background-color: var(--on-3) !important;
      cursor: not-allowed !important;
      pointer-events: none !important;
      transition: all 0.3s ease;
      .button__content {
        color: var(--bg) !important;
      }
      .button__icon-left {
        span {
          color: var(--bg) !important;
          transition: all 0.3s ease;
        }
      }
      .button__icon-right {
        span {
          color: var(--bg) !important;
          transition: all 0.3s ease;
        }
      }
    }
    // .button_loading
    &_loading {
      &::after {
        content: '';
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 1px solid var(--on-2);
        border-left-color: transparent;
        position: absolute;
        top: 50%;
        left: 50%;
        animation: rotate 0.6s linear infinite;
        @keyframes rotate {
          0% {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          100% {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }
      }
      &:hover {
        &::after {
          content: '';
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 1px solid var(--on-1);
          border-left-color: transparent;
          position: absolute;
          top: 50%;
          left: 50%;
          animation: rotate 0.6s linear infinite;
          @keyframes rotate {
            0% {
              transform: translate(-50%, -50%) rotate(0deg);
            }
            100% {
              transform: translate(-50%, -50%) rotate(360deg);
            }
          }
        }
      }
      .button__icon-left,
      .button__icon-right,
      .button__content {
        opacity: 0;
        visibility: hidden;
      }
    }

    // .button__active
    &_hover {
      &:hover {
        background: var(--onbg-1) !important;
        transition: all 0.3s ease;
        .button__content {
          color: var(--on-1) !important;
          transition: all 0.3s ease;
        }
        .button__icon-left {
          span {
            color: var(--on-1) !important;
            transition: all 0.3s ease;
          }
        }
        .button__icon-right {
          span {
            color: var(--on-1) !important;
            transition: all 0.3s ease;
          }
        }
      }
    }
    &_hover-bg {
      background: var(--onbg-1) !important;
    }
    &_hover-bg-hover {
      &:hover {
        background: var(--bg-inverted) !important;
        .button__content {
          color: var(--bg) !important;
          transition: all 0.3s ease;
        }
        .button__icon-left {
          span {
            color: var(--bg) !important;
            transition: all 0.3s ease;
          }
        }
        .button__icon-right {
          span {
            color: var(--bg) !important;
            transition: all 0.3s ease;
          }
        }
      }
    }
    &_active {
      background: var(--bg-inverted) !important;
      transition: all 0.3s ease;
      .button__content {
        color: var(--bg) !important;
      }
      .button__icon-left {
        span {
          color: var(--bg) !important;
        }
      }
      .button__icon-right {
        span {
          color: var(--bg) !important;
        }
      }
    }

    // .button__secondary
    &_secondary {
      background: var(--background);
      color: var(--caption);
      border-color: var(--background);
      transition: all 0.3s ease;

      &.button_soft {
        background: transparent;
        border-color: transparent;
        color: var(--caption);
      }
      &.button_outline {
        background: transparent;
        color: var(--caption);
        border-color: var(--caption);
      }
    }

    // .button__danger
    &_danger {
      background: var(--danger);
      color: var(--white);
      border-color: var(--danger);
      transition: all 0.3s ease;

      &.button_soft {
        background: transparent;
        color: var(--danger);
        border-color: transparent;
      }
      &.button_outline {
        background: transparent;
        color: var(--danger);
        border-color: var(--danger);
      }
      &.button_no-border {
        background: transparent;
        color: var(--danger);
        border: transparent;
      }
    }
    &.button_outline {
      background: var(--danger-100);
      color: var(--danger-600);
      border-color: var(--danger-600);
      transition: all 0.3s ease;
    }
    &.button_no-border {
      background: transparent;
      color: var(--danger-600);
      border: transparent;
      transition: all 0.3s ease;
    }
    // .button__warning
    &_warning {
      background: var(--warning-600);
      color: var(--white);
      border-color: var(--warning-600);
      transition: all 0.3s ease;

      &.button_soft {
        background: var(--warning-100);
        color: var(--warning-600);
      }
      &.button_outline {
        background: transparent;
        color: var(--warning-600);
        border-color: var(--warning-600);
      }
      &.button_no-border {
        background: transparent;
        color: var(--warning-600);
        border-color: transparent;
      }
    }
  }
</style>
