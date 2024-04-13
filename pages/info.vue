<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import MyTable from '@/components/base/Table.vue'
  import MyTableHead from '@/components/base/TableHead.vue'
  import MyTableBody from '@/components/base/TableBody.vue'
  import MyTableRow from '@/components/base/TableRow.vue'
  import MyButton from '@/components/base/MyButton.vue'
  import PopUpConfirm from '@/components/popup/PopUpConfirm.vue'
  import PopUpPdfEdit from '@/components/popup/PopUpPdfEdit.vue'
  import { useToast } from '@/stores/toast'

  import { transformDate } from '@/helpers/transformDate'

  const { $PDFDocument: PDFDocument } = useNuxtApp()

  const toast = useToast()

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
  const isDelete = ref<boolean>(false)
  const isEdit = ref<boolean>(false)
  const selectedId = ref<string | null>(null)
  const pdfSource = ref<string>('')
  const filePages = ref<number>(0)
  const fileWidth = ref<number>(0)
  const fileHeight = ref<number>(0)

  const selectAction = async (data: PdfInfo, action: string) => {
    try {
      const existingPdfBytes = await fetch(data.file).then((res) => res.arrayBuffer())
      const pdfDoc = await PDFDocument.load(existingPdfBytes)
      const pdfBytes = await pdfDoc.save()
      const blobUrl = URL.createObjectURL(new Blob([pdfBytes], { type: 'application/pdf' }))
      const pages = pdfDoc.getPages()
      const { width, height } = pages[0].getSize()

      selectedId.value = data.id

      switch (action) {
        case 'edit': {
          fileWidth.value = width
          fileHeight.value = height
          pdfSource.value = blobUrl
          filePages.value = pages.length
          isEdit.value = true
          break
        }
        case 'show': {
          window.open(blobUrl, '_blank')
          break
        }
        case 'delete': {
          isDelete.value = true
          break
        }
      }
    } catch (error) {
      console.error('Error selecting action:', error)
      toast.addToast({
        text: 'An error occurred while selecting your action',
        title: 'Error',
        status: 'error',
      })
    }
  }

  const confirm = () => {
    try {
      const usersInfos: PdfInfo[] = JSON.parse(localStorage.getItem('usersInfos') || '[]')
      const updatedInfos = usersInfos.filter((info: PdfInfo) => info.id !== selectedId.value) || []
      pdfInfos.value = updatedInfos
      localStorage.setItem('usersInfos', JSON.stringify(updatedInfos))
      toast.addToast({
        text: 'Successfully deleted PDF!',
        title: 'PDF Deleted',
      })
      closeConfirm()
    } catch (error) {
      console.error('Error confirming delete:', error)
      toast.addToast({
        text: 'An error occurred while deleting PDF',
        title: 'Error',
        status: 'error',
      })
    }
  }
  const closeConfirm = () => {
    isDelete.value = false
    selectedId.value = null
  }
  const closeEdit = () => {
    isEdit.value = false
    selectedId.value = null
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
    <Teleport to="body">
      <pop-up-confirm v-if="isDelete" @close="closeConfirm" @sure="confirm"></pop-up-confirm>
      <pop-up-pdf-edit v-if="isEdit" @close="closeEdit" :source="pdfSource" :width="fileWidth" :height="fileHeight" :pages="filePages"></pop-up-pdf-edit>
    </Teleport>
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
