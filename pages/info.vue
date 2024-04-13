<script setup lang="ts">
  import MyTable from '@/components/base/Table.vue'
  import MyTableHead from '@/components/base/TableHead.vue'
  import MyTableBody from '@/components/base/TableBody.vue'
  import MyTableRow from '@/components/base/TableRow.vue'
  import MyButton from '@/components/base/MyButton.vue'

  import { transformDate } from '@/helpers/transformDate'
  const { $VuePdfEmbed: VuePdfEmbed, $VueDraggableResizable: VueDraggableResizable, $PDFDocument: PDFDocument, $StandardFonts: StandardFonts, $download: download } = useNuxtApp()

  const tableHead = ref([
    { id: 1, name: '№' },
    { id: 2, name: 'File Name' },
    { id: 3, name: 'Date' },
    { id: 4, name: 'Actions' },
  ])

  const pdfInfos = ref<any>([])

  const selectAction = async (data, action) => {
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
        console.log('Blob URL:', blobUrl)
        break
      }
    }
  }

  onMounted(() => {
    pdfInfos.value = JSON.parse(localStorage.getItem('usersInfos') as any)
  })
</script>

<template>
  <div class="infos">
    <div class="infos__wrapper">
      <div class="infos__body">
        <my-table v-if="pdfInfos && pdfInfos.length">
          <my-table-head :items="tableHead" sticky />
          <my-table-body>
            <template v-for="(pdfInfo, index) in pdfInfos" :key="pdfInfo.id">
              <my-table-row>
                <td>{{ index + 1 }}</td>
                <td>{{ pdfInfo.fileName }}</td>
                <td>{{ transformDate(pdfInfo.date) }}</td>
                <td>
                  <div class="infos__actions">
                    <my-button title="show" @click="selectAction(pdfInfo, 'show')"></my-button>
                    <my-button title="edit" active @click="selectAction(pdfInfo, 'edit')"></my-button>
                    <my-button title="delete" background="warning" title-color="clear" @click="selectAction(pdfInfo, 'delete')"></my-button>
                  </div>
                </td>
              </my-table-row>
            </template>
          </my-table-body>
        </my-table>
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
