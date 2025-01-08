import React from 'react'

import { JapaneseAnnotator } from 'japanese-annotator'
import 'japanese-annotator/dist/index.css'

const App = () => {
  return (
  <div style={{ display: 'inline-block', margin: '32px', padding: '16px', backgroundColor: '#f7f7f7', borderRadius: '8px', width: '400px' }}>
  <JapaneseAnnotator type='furigana'
    children='私が送った文を日本語してください'
     />
     </div>
     )
}

export default App
