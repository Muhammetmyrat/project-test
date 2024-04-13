<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import MyTable from '@/components/base/Table.vue'
  import MyTableHead from '@/components/base/TableHead.vue'
  import MyTableBody from '@/components/base/TableBody.vue'
  import MyTableRow from '@/components/base/TableRow.vue'
  import MyButton from '@/components/base/MyButton.vue'

  import { transformDate } from '@/helpers/transformDate'

  const { $PDFDocument: PDFDocument } = useNuxtApp()

  interface PdfInfo {
    id: string
    fileName: string
    date: Date | string
    file: string
  }

  const tableHead = ref([
    { id: 1, name: '№' },
    { id: 2, name: 'File Name' },
    { id: 3, name: 'Date' },
    { id: 4, name: 'Actions' },
  ])

  const pdfInfos = ref<PdfInfo[]>([])

  const selectAction = async (data: PdfInfo, action: string) => {
    const existingPdfBytes = await fetch(data.file).then((res) => res.arrayBuffer())
    const pdfDoc = await PDFDocument.load(existingPdfBytes)
    const pdfBytes = await pdfDoc.save()

    switch (action) {
      case 'edit': {
        const pages = pdfDoc.getPages()
        const { width, height } = pages[0].getSize()
        break
      }
      case 'show': {
        const blobUrl = URL.createObjectURL(new Blob([pdfBytes], { type: 'application/pdf' }))
        window.open(blobUrl, '_blank')
        break
      }
      case 'delete': {
        const usersInfos: any[] = JSON.parse(localStorage.getItem('usersInfos') || '[]')
        const usersInfosSlice = usersInfos.filter((info: PdfInfo) => info.id !== data.id) || []
        pdfInfos.value = usersInfosSlice
        localStorage.setItem('usersInfos', JSON.stringify(usersInfosSlice))
        break
      }
    }
  }

  onMounted(() => {
    pdfInfos.value = JSON.parse(localStorage.getItem('usersInfos') || '[]') as PdfInfo[]
  })
</script>

<template>
  <div class="infos">
    <div class="infos__wrapper">
      <div class="infos__body">
        <MyTable v-if="pdfInfos && pdfInfos.length">
          <MyTableHead :items="tableHead" sticky />
          <MyTableBody>
            <template v-for="(pdfInfo, index) in pdfInfos" :key="pdfInfo.id">
              <MyTableRow>
                <td>{{ index + 1 }}</td>
                <td>{{ pdfInfo.fileName }}</td>
                <td>{{ transformDate(pdfInfo.date) }}</td>
                <td>
                  <div class="infos__actions">
                    <MyButton title="show" @click="selectAction(pdfInfo, 'show')" />
                    <MyButton title="edit" active @click="selectAction(pdfInfo, 'edit')" />
                    <MyButton title="delete" background="warning" title-color="clear" @click="selectAction(pdfInfo, 'delete')" />
                  </div>
                </td>
              </MyTableRow>
            </template>
          </MyTableBody>
        </MyTable>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .infos {
    width: 100%;
    height: 100%;

    &__wrapper {
      width: 100%;
      height: 100%;
    }

    &__body {
      width: 80%;
      height: 800px;
      margin: 0 auto;
      padding: 60px 0px;
    }

    &__actions {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 10px;
    }
  }
</style>
