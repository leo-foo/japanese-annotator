import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { parseText } from '../utils/parseText'
import { generateFuriganaAnnotationsAsync } from '../utils/generateAnnotations'

type AnnotatorProps = {
  children: React.ReactNode
  style?: React.CSSProperties
  type?: 'furigana' | 'romaji'
}

export const JapaneseAnnotator: React.FC<AnnotatorProps> = ({
  children,
  style = {},
  type = 'furigana'
}) => {
  if (typeof children !== 'string') {
    throw new Error('Children must be a string containing Japanese text')
  }

  // const parsedText = parseText(children)
  // const annotations = generateAnnotations(parsedText, type)
  const [annotations, setAnnotations] = useState<[string, string][]>([])
  useEffect(() => {
    const fetchAnnotations = async () => {
      const parsedText = parseText(children)
      const generatedAnnotations = await generateFuriganaAnnotationsAsync(
        parsedText
      )
      setAnnotations(generatedAnnotations)
    }

    fetchAnnotations()
  }, [children, type])

  return (
    <div style={{ ...style, display: 'inline-block' }}>
      {annotations.map(([char, annotation], idx) => (
        <ruby key={idx}>
          {char}
          {annotation && <rt>{annotation}</rt>}
        </ruby>
      ))}
    </div>
  )
}

// PropTypes for runtime validation
JapaneseAnnotator.propTypes = {
  children: PropTypes.string.isRequired,
  style: PropTypes.object,
  type: PropTypes.oneOf(['furigana', 'romaji'])
}

JapaneseAnnotator.defaultProps = {
  style: {},
  type: 'furigana'
}
