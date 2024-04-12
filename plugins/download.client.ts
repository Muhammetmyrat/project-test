import download from 'downloadjs'

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      download,
    },
  }
})
