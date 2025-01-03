import { parseText } from '../src/utils/parseText'
import { generateAnnotations } from '../src/utils/generateAnnotations'

test('Performance for 1000 characters', () => {
  const input = '私が送った文'.repeat(100)
  const start = performance.now()
  const parsedText = parseText(input)
  generateAnnotations(parsedText, 'furigana')
  const end = performance.now()
  expect(end - start).toBeLessThan(100)
})
