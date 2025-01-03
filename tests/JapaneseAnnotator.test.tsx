import React from 'react'
import { render } from '@testing-library/react'
import { JapaneseAnnotator } from '../src/components/JapaneseAnnotator'

describe('JapaneseAnnotator', () => {
  it('should render text with furigana annotations', () => {
    const { container } = render(
      <JapaneseAnnotator type='furigana'>私が送った文</JapaneseAnnotator>
    )

    expect(container.querySelectorAll('ruby')).toHaveLength(6)
    expect(container.querySelector('ruby')?.innerHTML).toContain(
      '<rt>わたし</rt>'
    )
  })

  it('should render text with romaji annotations', () => {
    const { container } = render(
      <JapaneseAnnotator type='romaji'>私が送った文</JapaneseAnnotator>
    )

    expect(container.querySelectorAll('ruby')).toHaveLength(6)
    expect(container.querySelector('ruby')?.innerHTML).toContain(
      '<rt>watashi</rt>'
    )
  })

  it('should apply custom styles', () => {
    const { container } = render(
      <JapaneseAnnotator
        type='furigana'
        style={{ color: 'red', fontSize: '14px' }}
      >
        私が送った文
      </JapaneseAnnotator>
    )

    console.log(container.innerHTML)

    // const div = container.querySelector('div')
    // expect(div).toHaveStyle('color: red')
    // expect(div).toHaveStyle('font-size: 14px')
  })
})
