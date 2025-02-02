# japanese-annotator

> 日语注音标注组件 / Japanese Text Annotation Component

[![NPM](https://img.shields.io/npm/v/japanese-annotator.svg)](https://www.npmjs.com/package/japanese-annotator) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## 功能特点 / Features

- 支持振り仮名（假名）和罗马音标注 / Support both furigana and romaji annotations
- 自定义样式 / Customizable styles
- 异步获取注音数据 / Async annotation loading
- 自动标注匹配 / Automatic annotation matching

## 安装 / Install

```bash
npm install --save japanese-annotator
```

## 使用方法 / Usage

### 基础用法 / Basic Usage

```tsx
import React from 'react'
import { JapaneseAnnotator } from 'japanese-annotator'
import 'japanese-annotator/dist/index.css'

const App = () => {
  return (
    <div>
      {/* 基础示例：自动处理注音 / Basic example: automatic annotation */}
      <JapaneseAnnotator type='furigana'>
        私が送った文を日本語してください
      </JapaneseAnnotator>

      {/* 使用自定义注音标注 / Custom annotation example */}
      <JapaneseAnnotator
        type='furigana'
        annotations={[
          ['私', 'わたし'], // わたし / watashi / 我 / I
          ['日本語', 'にほんご'], // にほんご / nihongo / 日语 / Japanese
          ['勉強', 'べんきょう'] // べんきょう / benkyou / 学习 / study
        ]}
      >
        私は日本語を勉強しています
      </JapaneseAnnotator>

      {/* 使用罗马音标注 / Romaji annotation example */}
      <JapaneseAnnotator
        type='romaji'
        annotations={[
          ['こんにちは', 'konnichiwa'], // 你好 / hello
          ['世界', 'sekai'] // 世界 / world
        ]}
      >
        こんにちは、世界！
      </JapaneseAnnotator>

      {/* 自定义样式示例 / Custom style example */}
      <JapaneseAnnotator
        type='furigana'
        annotations={[
          ['桜', 'さくら'], // さくら / sakura / 樱花 / cherry blossom
          ['花', 'はな'], // はな / hana / 花 / flower
          ['咲', 'さ'] // さ / sa / 开 / bloom
        ]}
        style={{
          fontSize: '24px', // 设置主文本大小 / Main text size
          color: '#d35400' // 设置主文本颜色 / Main text color
        }}
        annotationStyle={{
          fontSize: '12px', // 设置注音文本大小 / Annotation text size
          color: '#e84393' // 设置注音文本颜色 / Annotation text color
        }}
      >
        桜の花が咲きました
      </JapaneseAnnotator>

      {/* 异步获取注音示例 / Async annotation example */}
      <AsyncAnnotationExample />
    </div>
  )
}

// 异步注音示例组件 / Async annotation example component
const AsyncAnnotationExample = () => {
  // 模拟从API获取注音数据 / Simulate fetching annotations from API
  const getCustomAnnotations = async () => {
    // 这里应该是实际的API调用 / This should be an actual API call
    return [
      ['私', 'わたし'], // わたし / watashi / 我 / I
      ['今日', 'きょう'], // きょう / kyou / 今天 / today
      ['元気', 'げんき'] // げんき / genki / 精神 / energy
    ]
  }

  return (
    <JapaneseAnnotator type='furigana' getAnnotations={getCustomAnnotations}>
      私は今日とても元気です
    </JapaneseAnnotator>
  )
}

export default App
```

![alt text](https://raw.githubusercontent.com/leo-foo/japanese-annotator/main/public/demo.png)

### Props 参数说明 / Props Reference

#### children

- 类型 / Type: `string`
- 必填 / Required: ✅
- 说明 / Description: 需要标注的日语文本 / Japanese text to annotate

#### type

- 类型 / Type: `'furigana' | 'romaji'`
- 默认值 / Default: `'furigana'`
- 说明 / Description: 标注类型：假名或罗马音 / Annotation type: furigana or romaji

#### annotations

- 类型 / Type: `[string, string][]`
- 默认值 / Default: `[]`
- 说明 / Description: 自定义标注数组，格式为 `[原文, 注音]` / Custom annotations array in format `[text, annotation]`
- 示例 / Example:
  ```tsx
  annotations={[
    ['私', 'わたし'],
    ['日本語', 'にほんご']
  ]}
  ```

#### getAnnotations

- 类型 / Type: `() => Promise<[string, string][]>`
- 可选 / Optional: ✅
- 说明 / Description: 异步获取标注的函数 / Async function to fetch annotations
- 示例 / Example:
  ```tsx
  const getAnnotations = async () => {
    const data = await fetchFromAPI()
    return [
      ['私', 'わたし'],
      ['今日', 'きょう']
    ]
  }
  ```

```

## License

MIT © [](https://github.com/)
```
