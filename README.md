# Revite

IN PROGRESS.

## Install

```shell
yarn add revite
```

## Usage

See [demo](./demo) project

```ts
import { revite } from 'revite'

revite.bootstrap(import.meta.globEager('./config/default/*.ts'))
```

## Usage with Vite plugin

vite.config.ts
```ts
import { defineConfig } from 'vite'
import revite from 'revite/plugin'

export default defineConfig({
  plugins: [
    revite({
      root: '/src/config',
      use: process.env.TARGET_CONFIG as string,
    })
  ],  
})
```

main.ts
```ts
import { revite } from 'revite'
import config from '@revite/config'

revite.bootstrap(config)
```


## Configure

To use global Revite namespace update tsconfig.json

```json
{
  "compilerOptions": {
    "types": [
      "revite/global"
    ]
  }
}
```

### Service Provider

### Service

### Event

### Listener

## Built-in contracts

- LoggerServiceContract
- ReactivityServiceContract
