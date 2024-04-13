export const useGenerateUUID = (): { generateLetterUUID: () => string } => {
  const generateLetterUUID = (): string => {
    let uuid: string = ''
    const letters: string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

    for (let i: number = 0; i < 32; i++) {
      const index: number = Math.floor(Math.random() * letters.length)
      uuid += letters[index]
    }

    return uuid
  }

  return {
    generateLetterUUID,
  }
}
