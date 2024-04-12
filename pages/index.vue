<script setup lang="ts">
  const { $VuePdfEmbed: VuePdfEmbed, $VueDraggableResizable: VueDraggableResizable, $DraggableContainer: DraggableContainer } = useNuxtApp()
  import MyButton from '@/components/base/MyButton.vue'

  //   const pdfSource = computed(() => {
  //     return new URL(`../assets/files/1 page document example.pdf`, import.meta.url).href
  //   })

  const pdfSource = ref<string>('')
  const modifyInfos = ref<any>([])
  const page = ref<number>(1)
  const pageCount = ref<number>(0)

  const changeFile = (event: Event): void => {
    const target = event.target as HTMLInputElement
    if (target && target.files?.length) pdfSource.value = URL.createObjectURL(target.files[0])
  }

  const handleDocumentLoad = ({ numPages }: any) => {
    pageCount.value = numPages
  }

  const modifyPdf = async () => {
    modifyInfos.value.push({
      id: Date.now(),
      text: '',
      resizable: {
        y: 20,
        initW: 300,
        initH: 50,
        active: true,
      },
    })
  }
  const modifyPdfSlice = () => {
    modifyInfos.value.pop()
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
          <MyButton title="Add text" hover @click="modifyPdf" />
          <MyButton v-if="modifyInfos.length" background="var(--warning)" title-color="clear" title="Delete text" @click="modifyPdfSlice" />
        </div>
        <div class="upload-pdf__pdf">
          <div class="upload-pdf__header">
            <div class="upload-pdf__header-actions">
              <button :disabled="page <= 1" @click="page--">❮</button>
              {{ page }} / {{ pageCount }}
              <button :disabled="page >= pageCount" @click="page++">❯</button>
            </div>
          </div>
          <div class="upload-pdf__pdf-vdr">
            <template v-for="modifyInfo in modifyInfos" :key="modifyInfo.id">
              <VueDraggableResizable :initW="modifyInfo.resizable.initW" :initH="modifyInfo.resizable.initH" v-model:y="modifyInfo.resizable.y" v-model:active="modifyInfo.resizable.active" :draggable="true" :resizable="true">
                <textarea v-model="modifyInfo.text" placeholder="text"></textarea>
              </VueDraggableResizable>
            </template>
          </div>
          <VuePdfEmbed annotation-layer text-layer :page="page" @loaded="handleDocumentLoad" :source="pdfSource" />
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
            textarea {
              width: 100%;
              height: 100%;
              resize: none;
              background: transparent;
              text-transform: none;
              color: var(--on-1);
              font-size: 22px;
              font-style: normal;
              font-weight: 500;
              line-height: normal;
              padding: 5px;
              &::placeholder {
                color: var(--on-4);
              }
              &::-webkit-scrollbar {
                width: 8px;
                height: 8px;
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
            }
          }
        }
      }
      &:deep() {
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
    &__header {
      width: 70%;
      margin: 0 auto;
      padding: 20px;
      &-actions {
        button {
          border-radius: 10px;
          padding: 10px;
          color: var(--on-1);
          font-size: 10px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
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
