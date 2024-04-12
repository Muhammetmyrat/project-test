<script setup lang="ts">
  import MyButton from '@/components/base/MyButton.vue'
  import { PDFDocument, StandardFonts } from 'pdf-lib'
  import download from 'downloadjs'
  const { $VuePdfEmbed: VuePdfEmbed, $VueDraggableResizable: VueDraggableResizable, $DraggableContainer: DraggableContainer } = useNuxtApp()

  const pdfSource = ref<string>('')
  const modifyInfos = ref<any>([])
  const page = ref<number>(1)
  const pageCount = ref<number>(0)
  const vuePdfEmbed = ref<any>(null)
  const fileWidth = ref<number>(0)
  const fileHeight = ref<number>(0)

  const changeFile = async (event: Event) => {
    const target = event.target as HTMLInputElement
    if (target && target.files?.length) {
      const blobUrl = URL.createObjectURL(target.files[0])
      const existingPdfBytes = await fetch(blobUrl).then((res) => res.arrayBuffer())
      const pdfDoc = await PDFDocument.load(existingPdfBytes)
      const pages = pdfDoc.getPages()
      const { width, height } = pages[0].getSize()
      fileWidth.value = width
      fileHeight.value = height
      pdfSource.value = blobUrl
    }
  }

  const handleDocumentLoad = ({ numPages }: any) => {
    pageCount.value = numPages
  }

  const modifyPdf = async () => {
    modifyInfos.value.push({
      text: '',
      resizable: {
        y: 20,
        x: 0,
        initW: 300,
        initH: 40,
        active: true,
      },
    })
  }
  const modifyPdfSlice = () => {
    modifyInfos.value.pop()
  }
  const downloadPdf = async () => {
    const existingPdfBytes = await fetch(pdfSource.value).then((res) => res.arrayBuffer())

    const pdfDoc = await PDFDocument.load(existingPdfBytes)

    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

    const pages = pdfDoc.getPages()

    modifyInfos.value.forEach((modifyInfo: any) => {
      const { height } = pages[0].getSize()
      if (modifyInfo.resizable.y > height) {
        pages[Math.ceil(Number(modifyInfo.resizable.y / height)) - 1].drawText(modifyInfo.text, {
          x: modifyInfo.resizable.x,
          y: Number(modifyInfo.resizable.y - height) - 8,
          size: 20,
          font: helveticaFont,
        })
      } else {
        pages[0].drawText(modifyInfo.text, {
          x: modifyInfo.resizable.x,
          y: Number(height - modifyInfo.resizable.y) - 20,
          size: 20,
          font: helveticaFont,
        })
      }
    })

    const pdfBytes = await pdfDoc.save()

    download(pdfBytes, 'user.pdf', 'application/pdf')
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
          <div class="upload-pdf__header" :style="{ width: `${fileWidth}px` }">
            <!-- <div class="upload-pdf__header-actions">
              <button :disabled="page <= 1" @click="page--">❮</button>
              {{ page }} / {{ pageCount }}
              <button :disabled="page >= pageCount" @click="page++">❯</button>
            </div> -->
            <div class="upload-pdf__header-download">
              <MyButton title="Download PDF" active @click="downloadPdf" />
            </div>
          </div>
          <div class="upload-pdf__pdf-vdr">
            <template v-for="(modifyInfo, index) in modifyInfos" :key="index">
              <VueDraggableResizable
                :parent="true"
                :initW="modifyInfo.resizable.initW"
                :initH="modifyInfo.resizable.initH"
                v-model:y="modifyInfo.resizable.y"
                v-model:x="modifyInfo.resizable.x"
                v-model:active="modifyInfo.resizable.active"
                :draggable="true"
                :resizable="true"
              >
                <textarea v-model="modifyInfo.text" placeholder="text"></textarea>
              </VueDraggableResizable>
            </template>
            <VuePdfEmbed ref="vuePdfEmbed" :height="fileHeight" :width="fileWidth" :source="pdfSource" annotation-layer text-layer />
          </div>
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
      &-vdr {
        position: relative;
        width: max-content;
        height: 100%;
        margin: 0 auto;
        &:deep() {
          .vdr-container {
            user-select: none;
            z-index: 9;
            textarea {
              width: 100%;
              height: 100%;
              resize: none;
              background: transparent;
              text-transform: none;
              color: var(--on-1);
              font-size: 18px;
              font-style: normal;
              font-weight: 400;
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
          .vue-pdf-embed__page {
            margin-bottom: 8px;
            box-shadow: 4px 2px 8px 4px rgba(0, 0, 0, 0.1);
          }
        }
      }
    }
    &__header {
      margin: 0 auto;
      padding: 20px 0px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
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
