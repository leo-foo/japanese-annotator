import { toHiragana, toRomaji, isKanji } from 'wanakana'
// @ts-ignore
import Kuroshiro from 'kuroshiro'
// @ts-ignore
import KuromojiAnalyzer from 'kuroshiro-analyzer-kuromoji'
// 初始化 Kuroshiro

let kuroshiro: any = null
const initializeKuroshiro = async () => {
  console.log('initializing Kuroshiro...')
  const kuroshiro = new Kuroshiro()
  const dictPath = './dict/'
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
    console.log('converting text...', text)
    kuroshiro = kuroshiro || (await initializeKuroshiro())
    const result = await kuroshiro.convert(text, { to: 'hiragana' })
    console.log('result', result)

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
    console.log('char', char, toHiragana(char), toRomaji(char))
    const annotation = type === 'furigana' ? toHiragana(char) : toRomaji(char)
    return [char, annotation]
  })
}
export const generateFuriganaAnnotationsAsync = async (
  parsedText: string[]
): Promise<[string, string][]> => {
  kuroshiro = kuroshiro || (await initializeKuroshiro())

  // Use Promise.all to handle the array of promises
  const annotations = await Promise.all(
    parsedText.map(async (char) => {
      if (!isKanji(char)) return [char, ''] as [string, string]

      const furigana = await convertToFurigana(char)
      console.log('char', char, furigana)
      return [char, furigana] as [string, string]
    })
  )
  return annotations
}
