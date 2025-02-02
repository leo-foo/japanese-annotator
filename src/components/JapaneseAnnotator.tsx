import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { parseText } from '../utils/parseText'
import {
  generateFuriganaAnnotationsAsync,
  switchAnnotationsType
} from '../utils/generateAnnotations'

type AnnotatorProps = {
  children: React.ReactNode
  style?: React.CSSProperties
  annotationStyle?: React.CSSProperties
  type?: 'furigana' | 'romaji'
  annotations?: [string, string][]
  getAnnotations?: () => Promise<[string, string][]>
}

export const JapaneseAnnotator: React.FC<AnnotatorProps> = ({
  children,
  style = {},
  annotationStyle = {},
  type = 'furigana',
  annotations: customAnnotations,
  getAnnotations
}) => {
  if (typeof children !== 'string') {
    throw new Error('Children must be a string containing Japanese text')
  }

  const [annotations, setAnnotations] = useState<[string, string][]>(
    customAnnotations || []
  )
  useEffect(() => {
    const fetchAnnotations = async () => {
      // 通过传入的 getAnnotations 获取注释
      if (getAnnotations) {
        // todo: add cache
        let annotations: [string, string][] | undefined
        try {
          annotations = await getAnnotations()
        } catch (error) {
          console.error('Error fetching annotations:', error)
        }
        if (annotations) {
          const merged = mergeAnnotations(children, annotations, type)
          setAnnotations(merged)
          return
        }
      }

      // 通过传入的 customAnnotations 获取注释
      if (customAnnotations) {
        const merged = mergeAnnotations(children, customAnnotations, type)
        setAnnotations(merged)
        return
      }

      // 通过解析句子查询词典获取注释
      const parsedText = parseText(children)
      const generatedAnnotations = await generateFuriganaAnnotationsAsync(
        parsedText,
        type
      )
      setAnnotations(generatedAnnotations)
    }

    fetchAnnotations()
  }, [children, type])

  return (
    <div
      style={{
        display: 'inline-block',
        lineHeight: '2',
        whiteSpace: 'pre-wrap',
        wordWrap: 'break-word',
        overflowWrap: 'break-word',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxWidth: '100%',
        ...style
      }}
    >
      {annotations.map(([char, annotation], idx) => (
        <ruby key={idx}>
          {char}
          {annotation && (
            <rt
              style={{
                fontSize: '8px',
                color: '#666',
                fontWeight: 'bold',
                ...annotationStyle
              }}
            >
              {annotation}
            </rt>
          )}
        </ruby>
      ))}
    </div>
  )
}

/**
 * 根据全文 text 和用户传入的局部标注 customAnnotations，合并生成完整的标注列表。
 * @param text 全文字符串
 * @param customAnnotations 用户提供的局部标注，数组中每一项为 [substring, annotation]
 * @returns 完整的标注列表，格式为 [segment, annotation][]
 */
const mergeAnnotations = (
  text: string,
  customAnnotations: [string, string][],
  type: 'furigana' | 'romaji'
): [string, string][] => {
  const result: [string, string][] = []
  let pointer = 0

  customAnnotations.forEach(([segment, annotation]) => {
    // 从当前指针位置查找标注片段的位置
    const index = text.indexOf(segment, pointer)
    if (index === -1) {
      // 没找到，忽略这个片段，或记录错误信息
      console.warn(`Segment "${segment}" 未在文本中找到，忽略此标注。`)
      return
    }
    // 先处理 [pointer, index) 之间的未标注部分
    while (pointer < index) {
      result.push([text[pointer], ''])
      pointer++
    }
    // 将匹配到的标注片段作为一个整体添加进去
    result.push([segment, annotation])
    pointer += segment.length
  })

  // 处理尾部剩余的未标注部分
  while (pointer < text.length) {
    result.push([text[pointer], ''])
    pointer++
  }

  return switchAnnotationsType(result, type)
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
