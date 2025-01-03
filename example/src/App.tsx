import React from 'react'

import { JapaneseAnnotator } from 'japanese-annotator'
import 'japanese-annotator/dist/index.css'

const App = () => {
  return (<JapaneseAnnotator type='romaji'
    // children='座禅‘zazen’スタイル'
    children='私が送った文を日本語してください'
     />)
}

export default App
