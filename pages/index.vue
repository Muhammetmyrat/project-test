<script setup lang="ts">
  const { $VuePdfEmbed: VuePdfEmbed, $VueDraggableResizable: VueDraggableResizable, $DraggableContainer: DraggableContainer } = useNuxtApp()
  import MyButton from '@/components/base/MyButton.vue'
  import TextField from '@/components/base/TextField.vue'

  //   const pdfSource = computed(() => {
  //     return new URL(`../assets/files/1 page document example.pdf`, import.meta.url).href
  //   })

  const info = ref<string>('')
  const pdfSource = ref<string | null>('')
  const resizable = reactive({
    y: 20,
    h: 50,
    w: 300,
    active: true,
  })

  const changeFile = (event: Event): void => {
    const target = event.target as HTMLInputElement
    if (target.files) {
      const blob = URL.createObjectURL(target.files[0])
      if (blob) {
        pdfSource.value = blob
      }
    }
  }

  const print = (val: any) => {
    console.log(val)
  }
</script>

<template>
  <div class="upload-pdf">
    <div class="upload-pdf__wrapper">
      <div class="upload-pdf__action">
        <MyButton title="Upload PDF" active />
        <input class="upload-pdf__action-file" type="file" accept=".pdf" name="file" @change="changeFile" />
      </div>
      <div class="upload-pdf__body" v-if="pdfSource">
        <div class="upload-pdf__textarea">
          <div class="upload-pdf__input">
            <TextField v-model="info" />
          </div>
          <MyButton title="save" hover />
        </div>
        <div class="upload-pdf__pdf">
          <div class="upload-pdf__pdf-vdr">
            <VueDraggableResizable
              :initW="300"
              :initH="50"
              v-model:y="resizable.y"
              v-model:active="resizable.active"
              :draggable="true"
              :resizable="true"
              @activated="print('activated')"
              @deactivated="print('deactivated')"
              @drag-start="print('drag-start')"
              @resize-start="print('resize-start')"
              @dragging="print('dragging')"
              @resizing="print('resizing')"
              @drag-end="print('drag-end')"
              @resize-end="print('resize-end')"
            >
              This is a test example
            </VueDraggableResizable>
          </div>
          <ClientOnly>
            <VuePdfEmbed annotation-layer text-layer :source="pdfSource" />
          </ClientOnly>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .upload-pdf {
    width: 100%;
    height: 100%;
    padding: 40px 0px;
    &__wrapper {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      flex-direction: column;
      gap: 30px;
    }
    &__action {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      &-file {
        position: absolute;
        opacity: 0;
        cursor: pointer;
      }
    }
    &__body {
      width: 100%;
      height: 100%;
    }
    &__pdf {
      width: 100%;
      height: 100%;
      position: relative;
      &-vdr {
        position: absolute;
        top: 0px;
        left: 50%;
        transform: translateX(-50%);
        user-select: none;
        z-index: 9;
        &:deep() {
          .vdr-container {
            transform: translateX(-50%);
            color: var(--on-1);
            font-size: 20px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
          }
        }
      }
      &:deep() {
        .vue-pdf-embed {
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .vue-pdf-embed__page {
          width: 70% !important;
          margin: 0 auto !important;
          margin-bottom: 8px;
          box-shadow: 0 2px 8px 4px rgba(0, 0, 0, 0.1);
          canvas {
            width: 100% !important;
          }
        }
      }
    }
    &__textarea {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 40px;
      margin-bottom: 30px;
    }
    &__input {
      width: 50%;
    }
  }
</style>
