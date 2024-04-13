<script setup lang="ts">
  import MyButton from '@/components/base/MyButton.vue'
  import PdfEmbed from '@/components/PdfEmbed.vue'

  const { $PDFDocument: PDFDocument } = useNuxtApp()

  import { useGenerateUUID } from '@/composables/generateUUID'

  const { generateLetterUUID } = useGenerateUUID()

  const pdfSource = ref<string>('')
  const fileWidth = ref<number>(0)
  const fileHeight = ref<number>(0)

  const handleChangeFile = async (event: Event) => {
    const target = event.target as HTMLInputElement

    if (!target.files?.length) return

    const file = target.files[0]
    const reader = new FileReader()

    reader.onload = async (event) => {
      const base64encodedFile = event?.target?.result as string

      const blobUrl = URL.createObjectURL(file)

      const existingPdfBytes = await fetch(blobUrl).then((res) => res.arrayBuffer())
      const pdfDoc = await PDFDocument.load(existingPdfBytes)

      const pages = pdfDoc.getPages()
      const { width, height } = pages[0].getSize()

      fileWidth.value = width
      fileHeight.value = height
      pdfSource.value = blobUrl

      savePdfToLocalStorage(file, base64encodedFile)
    }

    reader.readAsDataURL(file)
  }

  const savePdfToLocalStorage = (file: File, base64encodedFile: string) => {
    const uniqueLetterId = generateLetterUUID()
    const fileInfo = {
      id: uniqueLetterId,
      date: new Date(),
      file: base64encodedFile,
      fileName: file.name,
    }

    const usersInfos: any[] = JSON.parse(localStorage.getItem('usersInfos') || '[]')
    usersInfos.push(fileInfo)
    localStorage.setItem('usersInfos', JSON.stringify(usersInfos))
  }
</script>

<template>
  <div class="upload-pdf">
    <div class="upload-pdf__wrapper">
      <div class="upload-pdf__action">
        <MyButton title="Upload PDF" active />
        <input class="upload-pdf__action-file" type="file" accept=".pdf" name="file" @change="handleChangeFile" />
      </div>
      <div class="upload-pdf__body" v-if="pdfSource">
        <PdfEmbed :source="pdfSource" :width="fileWidth" :height="fileHeight" />
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
  }
</style>
