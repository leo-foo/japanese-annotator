import { parseText } from '../src/utils/parseText'

test('parseText splits text into array of characters', () => {
  const input = '私が送った文'
  const result = parseText(input)
  expect(result).toEqual(['私', 'が', '送', 'っ', 'た', '文'])
})
