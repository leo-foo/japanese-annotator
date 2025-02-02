import React from 'react'
import { JapaneseAnnotator } from 'japanese-annotator'
import 'japanese-annotator/dist/index.css'

const App = () => {
  // 模拟异步获取注释的函数
  const getCustomAnnotations = async (): Promise<[string, string][]> => {
    // 模拟API调用延迟
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return [
      ['私', 'わたし'],
      ['今日', 'きょう'],
      ['元気', 'げんき']
    ]
  }

  return (
    <div style={{ padding: '20px' }}>
      {/* 基础示例 Basic Example */}
      <div className='example-block'>
        <h3>基础振り仮名示例 / Basic Furigana Example：</h3>
        <div className='demo'>
          <JapaneseAnnotator
            type='furigana'
            annotations={[
              ['私', 'わたし'],
              ['日本語', 'にほんご'],
              ['勉強', 'べんきょう']
            ]}
          >
            私は日本語を勉強しています
          </JapaneseAnnotator>
        </div>
        <div className='description'>
          <p>基础用法展示了如何添加简单的振り仮名标注。</p>
          <p>
            This basic example shows how to add simple furigana annotations.
          </p>
        </div>
        <pre className='code-block'>
          {`<JapaneseAnnotator
  type='furigana'
  annotations={[
    ['私', 'わたし'],
    ['日本語', 'にほんご'],
    ['勉強', 'べんきょう']
  ]}>
  私は日本語を勉強しています
</JapaneseAnnotator>`}
        </pre>
      </div>

      {/* 罗马音示例 Romaji Example */}
      <div className='example-block'>
        <h3>罗马音示例 / Romaji Example：</h3>
        <div className='demo'>
          <JapaneseAnnotator
            type='romaji'
            annotations={[
              ['こんにちは', 'konnichiwa'],
              ['世界', 'sekai']
            ]}
          >
            こんにちは、世界！
          </JapaneseAnnotator>
        </div>
        <div className='description'>
          <p>使用罗马音（拼音）方式显示注音。</p>
          <p>Display annotations using romaji (romanized Japanese).</p>
        </div>
        <pre className='code-block'>
          {`<JapaneseAnnotator
  type='romaji'
  annotations={[
    ['こんにちは', 'konnichiwa'],
    ['世界', 'sekai']
  ]}>
  こんにちは、世界！
</JapaneseAnnotator>`}
        </pre>
      </div>

      {/* 自定义样式示例 Custom Style Example */}
      <div className='example-block'>
        <h3>自定义样式示例 / Custom Style Example：</h3>
        <div className='demo'>
          <JapaneseAnnotator
            type='furigana'
            annotations={[
              ['桜', 'さくら'],
              ['花', 'はな'],
              ['咲', 'さ']
            ]}
            style={{
              fontSize: '24px',
              color: '#d35400'
            }}
            annotationStyle={{
              fontSize: '12px',
              color: '#e84393'
            }}
          >
            桜の花が咲きました
          </JapaneseAnnotator>
        </div>

        <div className='description'>
          <p>通过 style 和 annotationStyle 属性自定义文本和注音的样式。</p>
          <p>
            Customize the appearance of text and annotations using style and
            annotationStyle props.
          </p>
        </div>
        <pre className='code-block'>
          {`<JapaneseAnnotator
  type='furigana'
  annotations={[
    ['桜', 'さくら'],
    ['花', 'はな'],
    ['咲', 'さ']
  ]}
  style={{
    fontSize: '24px',
    color: '#d35400'
  }}
  annotationStyle={{
    fontSize: '12px',
    color: '#e84393'
  }}>
  桜の花が咲きました
</JapaneseAnnotator>`}
        </pre>
      </div>

      {/* 异步获取注释示例 Async Annotations Example */}
      <div className='example-block'>
        <div className='demo'>
          <JapaneseAnnotator
            type='furigana'
            getAnnotations={getCustomAnnotations}
          >
            私は今日とても元気です
          </JapaneseAnnotator>
        </div>

        {/* ... 代码示例部分也需要更新 ... */}
        <pre className='code-block'>
          {`// 异步获取注释的函数 / Async function to fetch annotations
const getCustomAnnotations = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  return [
    ['私', 'わたし'],
    ['今日', 'きょう'],
    ['元気', 'げんき']
  ]
}

<JapaneseAnnotator
  type='furigana'
  getAnnotations={getCustomAnnotations}>
  私は今日とても元気です
</JapaneseAnnotator>`}
        </pre>
      </div>

      <style>{`
        .example-block {
          margin: 20px;
          padding: 16px;
          background-color: #f7f7f7;
          border-radius: 8px;
          width: 600px;
        }
        h3 {
          margin-top: 0;
          color: #2c3e50;
          font-size: 16px;
          border-bottom: 1px solid #ddd;
          padding-bottom: 8px;
        }
        .demo {
          margin: 16px 0;
          padding: 16px;
          background-color: white;
          border-radius: 4px;
          border: 1px solid #eee;
        }
        .description {
          margin: 16px 0;
          padding: 12px;
          background-color: #e3f2fd;
          border-radius: 4px;
          font-size: 14px;
        }
        .description p {
          margin: 4px 0;
        }
        .code-block {
          margin: 0;
          padding: 16px;
          background-color: #2d3436;
          color: #dfe6e9;
          border-radius: 4px;
          font-size: 14px;
          overflow-x: auto;
        }
      `}</style>
    </div>
  )
}

export default App
