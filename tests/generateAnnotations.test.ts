import { generateAnnotations } from '../src/utils/generateAnnotations'

describe('generateAnnotations', () => {
  it('should generate furigana annotations for Japanese text', () => {
    const input = ['私', 'が', '送', 'っ', 'た', '文']
    const result = generateAnnotations(input, 'furigana')
    expect(result).toEqual([
      ['私', 'わたし'],
      ['が', 'が'],
      ['送', 'おく'],
      ['っ', 'っ'],
      ['た', 'た'],
      ['文', 'ぶん']
    ])
  })

  it('should generate romaji annotations for Japanese text', () => {
    const input = ['私', 'が', '送', 'っ', 'た', '文']
    const result = generateAnnotations(input, 'romaji')
    expect(result).toEqual([
      ['私', 'watashi'],
      ['が', 'ga'],
      ['送', 'oku'],
      ['っ', ''],
      ['た', 'ta'],
      ['文', 'bun']
    ])
  })

  it('should throw an error for invalid input', () => {
    expect(() => generateAnnotations(null as any, 'furigana')).toThrow(
      'Parsed text must be an array'
    )
  })
})
