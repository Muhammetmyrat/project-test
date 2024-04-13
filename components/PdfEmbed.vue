<script setup lang="ts">
  import { defineProps, ref } from 'vue'
  import MyButton from '@/components/base/MyButton.vue'
  import { useGenerateUUID } from '@/composables/generateUUID'
  const { $VuePdfEmbed: VuePdfEmbed, $VueDraggableResizable: VueDraggableResizable, $PDFDocument: PDFDocument, $StandardFonts: StandardFonts, $download: download } = useNuxtApp()

  interface ModifyInfo {
    text: string
    resizable: {
      x: number
      y: number
      initW: number
      initH: number
      active: boolean
    }
  }

  const { generateLetterUUID } = useGenerateUUID()

  const props = defineProps({
    source: {
      type: String,
      default: '',
    },
    width: {
      type: Number,
      default: 0,
    },
    height: {
      type: Number,
      default: 0,
    },
  })

  const modifyInfos = ref<ModifyInfo[]>([])
  const vuePdfEmbed = ref<any>(null)

  const modifyPdf = () => {
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
    const existingPdfBytes = await fetch(props.source).then((res) => res.arrayBuffer())
    const pdfDoc = await PDFDocument.load(existingPdfBytes)
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
    const pages = pdfDoc.getPages()

    modifyInfos.value.forEach((modifyInfo) => {
      const { height } = pages[0].getSize()
      const offsetY = modifyInfo.resizable.y > height ? modifyInfo.resizable.y - height - 8 : height - modifyInfo.resizable.y - 20
      const offsetX = modifyInfo.resizable.x + 5

      const pageIndex = modifyInfo.resizable.y > height ? Math.ceil(Number(modifyInfo.resizable.y / height)) - 1 : 0

      pages[pageIndex].drawText(modifyInfo.text, {
        x: offsetX,
        y: offsetY,
        size: 20,
        font: helveticaFont,
      })
    })

    const pdfBytes = await pdfDoc.save()
    const uniqueLetterId = generateLetterUUID()

    download(pdfBytes, `user-${uniqueLetterId}.pdf`, 'application/pdf')
  }
</script>

<template>
  <div class="pdf">
    <div class="pdf__textarea">
      <MyButton title="Add text" hover @click="modifyPdf" />
      <MyButton v-if="modifyInfos.length" background="warning" title-color="clear" title="Delete text" @click="modifyPdfSlice" />
    </div>
    <div class="pdf__pdf">
      <div class="pdf__header" :style="{ width: `${width}px` }">
        <div class="pdf__header-download">
          <MyButton title="Download PDF" active @click="downloadPdf" />
        </div>
      </div>
      <div class="pdf__pdf-vdr">
        <template v-for="(modifyInfo, index) in modifyInfos" :key="index">
          <VueDraggableResizable
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
        <VuePdfEmbed ref="vuePdfEmbed" :height="height" :width="width" :source="source" annotation-layer text-layer />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .pdf {
    width: 100%;
    height: 100%;

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
            box-shadow: 4px 2px 8px 4px var(--box-shadow);
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
    }
  }
</style>
