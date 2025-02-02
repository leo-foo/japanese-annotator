import { toHiragana, toRomaji, isKanji } from 'wanakana'
// @ts-ignore
import Kuroshiro from 'kuroshiro'
// @ts-ignore
import KuromojiAnalyzer from 'kuroshiro-analyzer-kuromoji'
// 初始化 Kuroshiro

let kuroshiro: any = null
const initializeKuroshiro = async () => {
  const kuroshiro = new Kuroshiro()
  const dictPath = 'https://leo-foo.github.io/japanese-dict/dict/'
  // const dictPath = './dict/'
  await kuroshiro.init(
    new KuromojiAnalyzer({ dictPath: dictPath }, function (err: any) {
      console.log('init', err)

      if (err) {
        console.log('failed', err)
      } else {
        console.log('Kuroshiro initialized successfully')
      }
    })
  ) // 字典文件路径
  return kuroshiro
}

// 转换函数
export const convertToFurigana = async (text: string): Promise<string> => {
  try {
    kuroshiro = kuroshiro || (await initializeKuroshiro())
    const result = await kuroshiro.convert(text, { to: 'hiragana' })

    return result
  } catch (error) {
    console.error('Error converting text:', error)
    return ''
  }
}

export const generateAnnotations = (
  parsedText: string[],
  type: 'furigana' | 'romaji'
): [string, string][] => {
  return parsedText.map((char) => {
    if (!isKanji(char)) return [char, '']
    const annotation = type === 'furigana' ? toHiragana(char) : toRomaji(char)
    return [char, annotation]
  })
}

export const switchAnnotationsType = (
  annotations: [string, string][],
  type: 'furigana' | 'romaji'
): [string, string][] => {
  return annotations.map(([char, a]) => {
    if (!a) return [char, '']
    const annotation = type === 'furigana' ? toHiragana(a) : toRomaji(a)
    return [char, annotation]
  })
}

export const generateFuriganaAnnotationsAsync = async (
  parsedText: string[],
  type: 'furigana' | 'romaji'
): Promise<[string, string][]> => {
  kuroshiro = kuroshiro || (await initializeKuroshiro())

  const annotations = await Promise.all(
    parsedText.map(async (char): Promise<[string, string]> => {
      if (!isKanji(char)) return [char, '']

      const furigana = await convertToFurigana(char)

      if (type === 'romaji') {
        const romaji = toRomaji(furigana)
        return [char, romaji]
      }
      return [char, furigana]
    })
  )
  return annotations
}
