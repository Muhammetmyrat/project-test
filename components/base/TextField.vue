<script setup>
  import { ref, computed } from 'vue'
  import Icon from './icon/Icon.vue'

  const emit = defineEmits(['click:prevent', 'click:append', 'update:modelValue', 'click:input', 'value', 'updateValue', 'send'])

  const props = defineProps({
    prependIcon: { type: String, default: null },
    appendIcon: { type: String, default: null },
    placeholder: { type: String, default: '' },
    label: { type: String, default: null },
    message: { type: String, default: null },
    type: { type: String, default: 'text' },
    success: { type: Boolean, default: false },
    error: { type: Boolean, default: false },
    modelValue: { type: [String, Number], default: null },
    clickablePrevent: { type: Boolean, default: false },
    clickableAppend: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    width: { type: String, default: null },
    focused: { type: Boolean, default: false },
    value: { type: [String, Number], default: null },
    innerLabel: { type: String, default: null },
    required: { type: Boolean, default: false },
    background: { type: Boolean, default: false },
    verification: { type: Boolean, default: false },
    focus: { type: Boolean, default: false },
  })

  const focused = ref(false)

  const classes = computed(() => [
    'input',
    {
      'input--background': props.background,
      'input--required': props.required,
      'input--prepend-icon': props.prependIcon,
      'input--append-icon': props.appendIcon,
      'input--success': props.success,
      'input--error': props.error,
      'input--disabled': props.disabled,
      'input--focused': focused.value || props.focused,
      'input--verification': props.verification,
    },
  ])

  let inputValue = ref(props.modelValue || props.value)

  const enforcePhoneFormat = () => {
    if (props.type === 'tel') {
      let x = inputValue.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,1})(\d{0,1})(\d{0,2})(\d{0,2})(\d{0,2})/)
      inputValue.value = !x[2] ? '+993' : '+993' + (x[2] ? x[2] : '') + (x[3] ? x[3] : '') + (x[4] ? x[4] : '') + (x[5] ? x[5] : '') + (x[6] ? x[6] : '')
      emit('update:modelValue', inputValue.value)
      emit('value', inputValue.value)
    } else {
      if (props.type === 'number') inputValue.value = Number(inputValue.value)
      emit('update:modelValue', inputValue.value)
      emit('value', inputValue.value)
    }
  }
  const send = (e) => {
    emit('send', e)
  }
</script>

<template>
  <div
    :class="classes"
    :style="{
      width: props.width ? `${props.width}px` : null,
    }"
  >
    <div v-if="props.label" class="input__label">{{ props.label }}</div>
    <div class="input__body">
      <div v-if="props.prependIcon" @click="$emit('click:prevent')" :class="['input__prepend-icon', { 'input__prepend-icon--clickable': props.clickablePrevent }]">
        <Icon :name="props.prependIcon" />
      </div>
      <div class="input__input">
        <input
          v-if="props.type !== 'button'"
          :type="props.type"
          :placeholder="props.placeholder"
          @input="enforcePhoneFormat"
          v-model="inputValue"
          :disabled="props.disabled"
          autocomplete="off"
          @click="$emit('click:input')"
          @focus="focused = true"
          @blur="focused = false"
          @keydown.enter.exact.prevent="(event) => send(event)"
        />
        <button v-else :placeholder="props.placeholder" :disabled="props.disabled" @click="$emit('click:input')" @focus="focused = true" @blur="focused = false">
          <p>
            {{ props.modelValue || props.value }}
          </p>
        </button>
        <span v-if="props.type === 'button' && props.placeholder && !props.modelValue && !props.value" class="input_placeholder">{{ props.placeholder }}</span>
        <span v-if="props.innerLabel" class="input__inner-label">{{ props.innerLabel }}</span>
      </div>
      <div v-if="props.error" @click="$emit('click:append')" :class="['input__append-icon', { 'input__append-icon--clickable': props.clickableAppend }]">
        <Icon name="errorIcon" />
      </div>
    </div>
    <div v-if="props.message" class="input__message">{{ props.message }}</div>
  </div>
</template>

<style lang="scss" scoped>
  .input {
    width: 100%;
    // .input__label
    &__label {
      margin-bottom: 4px;
      color: var(--on-2);
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
    // .input__body
    &__body {
      width: 100%;
      border-radius: 10px;
      border: 2px solid var(--on-2);
      position: relative;
    }

    // .input__prepend-icon
    &__prepend-icon {
      position: absolute;
      top: 50%;
      left: 10px;
      transform: translateY(-50%);
      pointer-events: none;
      span {
        color: var(--on-4);
      }
      :deep(svg) {
        color: var(--on-4);
        width: 20px;
        height: 20px;
      }
    }

    // .input__append-icon
    &__append-icon {
      position: absolute;
      top: 50%;
      right: 10px;
      transform: translateY(-50%);
      pointer-events: none;
      color: var(--caption);
      :deep(svg) {
        width: 20px;
        height: 20px;
      }
    }
    // .input__input
    &__input {
      width: 100%;
      display: flex;
      align-items: center;
      input {
        width: 100%;
        padding: 10px 12px;
        background-color: transparent;
        color: var(--on-1);
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        flex: 1 1;
        text-align: left;
        min-width: 0;
        margin: 0;
        box-sizing: border-box;
        -webkit-appearance: none;
        -moz-appearance: textfield;
        appearance: none;
        box-shadow: none;
        outline: 0;
        border-radius: 0;
        border: 0;
        resize: none;
        &::placeholder,
        .placeholder {
          color: var(--on-4);
          font-size: 14px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
        }
        &[type='submit'],
        &[type='button'] {
          cursor: pointer;
        }
        &[type='number'] {
          -moz-appearance: textfield;
        }
        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
          -webkit-appearance: none;
        }
      }
      button {
        background-color: transparent;
        padding: 10px 19px;
        width: 100%;
        p {
          font-weight: 500;
          font-size: 14px;
          line-height: 20px;
          color: var(--text);
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          text-align: left;
          height: 20px;
        }
      }
    }
    &_placeholder {
      font-size: 14px;
      line-height: 16px;
      color: var(--on-4);
      user-select: none;
      pointer-events: none;
      padding: 10px 19px;
      position: absolute;
      left: 0;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }

    // .input__message
    &__message {
      margin-top: 4px;
      color: var(--on-4);
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
    &__prepend-icon--clickable,
    &__append-icon--clickable {
      cursor: pointer;
      pointer-events: all;
      color: var(--on-1);
    }

    &--background {
      .input__body {
        background-color: var(--clear);
      }
    }
    &--required {
      .input__label {
        &::after {
          content: '*';
          color: var(--danger);
        }
      }
    }
    &--prepend-icon {
      .input__input {
        input {
          padding-left: 36px;
        }
      }
    }
    &--append-icon {
      .input__input {
        input,
        button {
          padding-right: 36px;
        }
      }
    }
    &--focused {
      .input__body {
        border-radius: 10px;
        border-color: var(--on-1);
        background: var(--clear);
      }
      .input__label {
        color: var(--on-1);
      }
    }
    &--success {
      .input__label {
      }
      .input__body {
      }
      .input__prepend-icon {
      }
      .input__append-icon {
      }
      .input__message {
      }
    }
    &--error {
      animation: 0.2s invalid forwards;
      .input__label {
        // color: var(--warning);
      }
      .input__body {
        border-color: var(--warning);
      }
      .input__prepend-icon {
      }
      .input__append-icon {
      }
      .input__message {
      }
    }
    &__inner-label {
      font-weight: 500;
      font-size: 14px;
      line-height: 16px;
      padding-right: 10px;
    }
    &--disabled {
      .input__label {
      }
      .input__body {
      }
      .input__input {
        input,
        button {
          cursor: not-allowed;
          pointer-events: all !important;
        }
      }
      .input__prepend-icon {
      }
      .input__append-icon {
      }
      .input__message {
      }
    }
    &--verification {
      input {
        text-align: center;
      }
    }
  }
  @keyframes invalid {
    0% {
      transform: translateX(0px);
    }
    25% {
      transform: translateX(5px);
    }
    50% {
      transform: translateX(0px);
    }
    75% {
      transform: translateX(-5px);
    }
    100% {
      transform: translateX(0px);
    }
  }
</style>
