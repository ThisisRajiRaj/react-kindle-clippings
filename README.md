# react-kindle-clippings

> A react component to parse and display kindle notes

[![NPM](https://img.shields.io/npm/v/react-kindle-clippings.svg)](https://www.npmjs.com/package/react-kindle-clippings) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-kindle-clippings
```

## Using the component in your React App
To use the KindleClippings React component in your own React app/web page,
follow the steps below
```jsx
import React, { Component } from 'react'

import KindleClippings from 'react-kindle-clippings'

class Example extends Component {
  render() {
    return <KindleClippings url="[URL to fetch kindleclippings.txt from]" />
  }
}
```
## How to find and save your Kindle highlights file 
You can find your Kindle notes and highlights when you connect
your kindle to your computer. Your highlights are saved in a 
file named "My Clippings.txt" in the root folder of the mounted
path of your kindle.

Copy this file, and save it as "KindleClippings.txt" to a public
URL which you will pass into this React component as a property

## License

MIT © [thisisrajiraj](https://github.com/thisisrajiraj)
