<div align="center" style={{d}}>
<h1>@rioe/layers</h1>

<a href="https://www.npmjs.com/package/@rioe/layers">
  <img src="https://img.shields.io/npm/v/@rioe/layers?color=%232680eb&label=NPM&logo=npm&logoColor=%232680eb&style=for-the-badge">
</a><img alt="NPM" src="https://img.shields.io/npm/l/@rioe/layers?color=%23000&style=for-the-badge">
</div>

<div align="center" style={{d}}>
    <img src="https://user-images.githubusercontent.com/16416929/71734439-f2aada00-2e86-11ea-9d5f-c782ccbc8e54.gif"/>
</div>
<p align="center">
  <strong>A Photoshop-like layers panel for your page editor.</strong>
</p>
<p align="center">
  <strong>
    <a href="https://craft.js.org/docs/additional/layers">Documentation</a>
  </strong>
</p>

<p align="center">
  <strong>
    <a href="https://craft.js.org">Craft.js</a>
  </strong>
</p>

## Usage

```bash
yarn add @rioe/layers styled-components
```

```jsx
import React from "react";
import {Editor} from "@rioe/core"
import {Layers} from "@rioe/layers"

export default function App() {
  return (
    <div style={{margin: "0 auto", width: "800px"}}>
      <Typography variant="h5" align="center">A super simple page editor</Typography>
      <Editor resolver={...}>
        <Layers />
      </Editor>
    </div>
  );
}
```
