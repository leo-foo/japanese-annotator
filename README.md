# japanese-annotator

> Made with create-react-library

[![NPM](https://img.shields.io/npm/v/japanese-annotator.svg)](https://www.npmjs.com/package/japanese-annotator) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save japanese-annotator
```

## Usage

```tsx
import React from 'react'

import { JapaneseAnnotator } from 'japanese-annotator'
import 'japanese-annotator/dist/index.css'

const App = () => {
  return (
    <JapaneseAnnotator
      type='furigana'
      children='私が送った文を日本語してください'
    />
  )
}
export default App
```

![alt text](https://raw.githubusercontent.com/leo-foo/japanese-annotator/main/public/demo.png)

## License

MIT © [](https://github.com/)
