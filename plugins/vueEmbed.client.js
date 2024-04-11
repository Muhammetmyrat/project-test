import VuePdfEmbed from 'vue-pdf-embed'

import 'vue-pdf-embed/dist/style/index.css'

import 'vue-pdf-embed/dist/style/annotationLayer.css'
import 'vue-pdf-embed/dist/style/textLayer.css'

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      VuePdfEmbed,
    },
  }
})
