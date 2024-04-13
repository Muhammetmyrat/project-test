import { defineStore } from 'pinia'
export const useToast = defineStore({
  id: 'toast',
  state: () => ({
    toasts: [],
  }),
  getters: {
    getToasts: (state) => state.toasts,
  },
  actions: {
    addToast({ text, title, status = 'success' }) {
      let id = new Date().getTime()
      this.toasts.push({
        id,
        status,
        text,
        title,
      })
      setTimeout(() => {
        this.toasts = this.toasts.filter((item) => item.id !== id)
      }, 4000)
    },
  },
})
