# wimsta-embed

Free health & fitness calculators for any website or framework: BMI, body fat %, TDEE, macros, max heart rate, waist-to-height and 18 more. Each one shows an **honest range across published formulas** instead of one made-up number.

- Zero dependencies, a few KB
- Widgets load from [wimsta.com](https://wimsta.com/embed/), so formula fixes reach your site without a package update
- Dark and light themes, English and Spanish
- Works with plain HTML, React, Vue, Svelte, Astro and SSR

## Install

```sh
npm i wimsta-embed
```

## Use

```js
import { mount } from 'wimsta-embed';

const unmount = mount('#calc', 'bmi', { theme: 'light', lang: 'en' });
// later: unmount();
```

React:

```jsx
import { useEffect, useRef } from 'react';
import { mount } from 'wimsta-embed';

export function BmiCalculator() {
  const ref = useRef(null);
  useEffect(() => mount(ref.current, 'bmi', { theme: 'dark' }), []);
  return <div ref={ref} />;
}
```

Static sites, CMS blocks or server rendering: get paste-ready HTML.

```js
import { snippet } from 'wimsta-embed';
const html = snippet('tdee', { theme: 'light', width: 520 });
```

You can also skip npm and copy the snippet from the visual builder at https://wimsta.com/embed/.

## Options

| option | values | default |
|---|---|---|
| `theme` | `'dark'` \| `'light'` | `'dark'` |
| `lang` | `'en'` \| `'es'` (script widgets) | `'en'` |
| `width` | max width in px (iframe widgets) | `480` |

## Calculators

`script` widgets render inline in a shadow root (isolated from your CSS). `iframe` widgets resize themselves to fit their content.

| id | calculator | type |
|---|---|---|
| `bmi` | BMI Calculator | script |
| `body-fat` | Body Fat Calculator | script |
| `waist-to-height` | Waist-to-Height Ratio Calculator | iframe |
| `rfm` | RFM Calculator | iframe |
| `ffmi` | FFMI Calculator | iframe |
| `body-shape` | Body Shape Calculator | iframe |
| `bsa` | Body Surface Area Calculator | iframe |
| `tdee` | TDEE Calculator | iframe |
| `maintenance-calories` | Maintenance Calorie Calculator | iframe |
| `calorie-deficit` | Calorie Deficit Calculator | iframe |
| `macros` | Macro Calculator | iframe |
| `protein` | Protein Calculator | iframe |
| `thermic-effect` | Thermic Effect of Food Calculator | iframe |
| `target-heart-rate` | Max Heart Rate Calculator | script |
| `karvonen` | Karvonen Heart Rate Calculator | iframe |
| `tanaka` | Tanaka Max Heart Rate Calculator | iframe |
| `220-minus-age` | 220-Minus-Age Max Heart Rate Calculator | iframe |
| `max-heart-rate-women` | Max Heart Rate Calculator for Women | iframe |
| `harris-benedict` | Harris–Benedict BMR Calculator | iframe |
| `katch-mcardle` | Katch–McArdle Calculator | iframe |
| `cun-bae` | CUN-BAE Body Fat Calculator | iframe |
| `deurenberg` | Deurenberg Body Fat Calculator | iframe |
| `us-navy-body-fat` | US Navy Body Fat Calculator | iframe |
| `ideal-weight` | Ideal Weight Calculator | iframe |

The list is also exported as `calculators`.

## Credit link

Every widget shows a small visible "WIMSTA" credit link. It keeps the widgets free, so please don't hide it. Results are informational and not medical advice.

## License

MIT © [WIMSTA](https://wimsta.com)
