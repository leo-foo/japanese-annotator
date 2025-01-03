import { toRomaji } from 'wanakana'

/**
 * Converts Japanese text to Romaji.
 * @param text - The input Japanese text.
 * @returns The Romaji-converted text.
 */
export const romajiConverter = (text: string): string => {
  if (!text) throw new Error('Input text cannot be empty')
  return toRomaji(text)
}
