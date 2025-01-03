import { tokenize } from 'wanakana'
export const parseText = (text: string): string[] => {
  const matches = tokenize(text, {
    compact: false,
    detailed: false
  }) as string[]

  return matches || []
}
