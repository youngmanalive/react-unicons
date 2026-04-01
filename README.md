# React Unicons

> **This is a fork of [`@iconscout/react-unicons`](https://github.com/Iconscout/react-unicons).**
>
> The original package hasn't been updated on npm since v2.0.1 and triggers the
> `"Support for defaultProps will be removed from function components"` warning
> in React 18.3+ / React 19. This fork fixes that, adds TypeScript declarations,
> and is published as `@youngmanalive/react-unicons`.

1,206 pixel-perfect vector icons as React components. Icons designed by [IconScout](https://iconscout.com).

## What's different from the original?

- **No more `defaultProps`** -- uses ES6 default parameters instead, eliminating React 19 deprecation warnings.
- **TypeScript support** -- ships with `.d.ts` declarations for full editor intellisense.
- **Published and up to date** -- available on npm as `@youngmanalive/react-unicons`.

## Installation

```bash
npm install @youngmanalive/react-unicons
```

## Usage

### Individual icons (recommended for tree-shaking)

```jsx
import React from 'react';
import UilReact from '@youngmanalive/react-unicons/icons/uil-react';

const App = () => {
  return <UilReact size="140" color="#61DAFB" />;
};

export default App;
```

### Named imports from the barrel

```jsx
import React from 'react';
import { UilReact } from '@youngmanalive/react-unicons';

const App = () => {
  return <UilReact size={140} color="#61DAFB" />;
};

export default App;
```

### Props

| Prop | Type | Default |
|------|------|---------|
| `color` | `string` | `'currentColor'` |
| `size` | `string \| number` | `24` |
| ...rest | Any valid SVG attribute | -- |

## Related

- [Unicons](https://github.com/Iconscout/unicons) -- the SVG source icons
- [Vue Unicons](https://github.com/antonreshetov/vue-unicons) by [Anton Reshetov](https://github.com/antonreshetov)

## License

The underlying [Unicons](https://github.com/Iconscout/unicons) SVGs are licensed under [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0).
