<script setup lang="ts">
  const { $VuePdfEmbed: VuePdfEmbed } = useNuxtApp()
  import MyButton from '@/components/base/MyButton.vue'

  //   const pdfSource = computed(() => {
  //     return new URL(`../assets/files/1 page document example.pdf`, import.meta.url).href
  //   })
  const pdfSource = ref<string | null>('')
  const changeFile = (event: Event): void => {
    const target = event.target as HTMLInputElement
    if (target.files) {
      const blob = URL.createObjectURL(target.files[0])
      if (blob) {
        pdfSource.value = blob
      }
    }
  }
</script>

<template>
  <div class="upload-pdf">
    <div class="upload-pdf__wrapper">
      <div class="upload-pdf__action">
        <MyButton title="Upload PDF" active />
        <input class="upload-pdf__action-file" type="file" accept=".pdf" name="file" @change="changeFile" />
      </div>
      <div class="upload-pdf__pdf" v-if="pdfSource">
        <ClientOnly>
          <VuePdfEmbed annotation-layer text-layer :source="pdfSource" />
        </ClientOnly>
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
    &__pdf {
      width: 100%;
      height: 100%;
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
  }
</style>
