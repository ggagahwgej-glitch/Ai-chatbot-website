import { CHARACTERS } from '@/types/characters'

export const getCharacter = (id: string) => {
  return CHARACTERS.find((c) => c.id === id)
}
