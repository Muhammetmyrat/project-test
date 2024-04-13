export const transformDate = (date: Date): string => {
  const day = new Date(date).getDay().toString().padStart(2, '0')
  const month = new Date(date).getMonth().toString().padStart(2, '0')
  const year = new Date(date).getFullYear()

  const hours = new Date(date).getHours().toString().padStart(2, '0')
  const minutes = new Date(date).getMinutes().toString().padStart(2, '0')

  return `${day}.${month}.${year} ${hours}:${minutes}`
}
