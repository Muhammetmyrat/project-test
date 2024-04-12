import { PDFDocument, StandardFonts } from 'pdf-lib'

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      PDFDocument,
      StandardFonts,
    },
  }
})
