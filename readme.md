# react-docgen-typescript-vite-plugin

![](https://nodei.co/npm/react-docgen-typescript-vite-plugin.png?downloadRank=true&downloads=true)

A simple plugin for vite to generate React component document infomation.

It can be used in [Storybook](https://www.npmjs.com/package/@storybook/react).

## Installation

```shell
npm i -D react-docgen-typescript-vite-plugin
```

## Usage

```js
//vite.config.js
const docgen = require("react-docgen-typescript-vite-plugin");

module.exports = {
  plugins: [docgen(["./**/*.tsx"])],
};
```

## Options

- `include`: files that should be included, support globby.
- `context?`: tsconfig file root, by default it is `process.cwd()`
