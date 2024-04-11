import Vue3DraggableResizable from 'vue3-draggable-resizable'

import 'vue3-draggable-resizable/dist/Vue3DraggableResizable.css'

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      VueDraggableResizable: Vue3DraggableResizable,
    },
  }
})
