# OHZI Components

## TextScrambler
- Replaces an element's text with new text. Each character shows random characters for a few frames before it settles.
- Class. Each instance animates one element at a time, so create one per element you animate together.

### Methods

- `init()`: Initialize component. Sets the default `chars` and `time`. Call it before `set_text()`.

- `set_text(element, new_text)`: Starts the effect on `element`. The current `innerText` is the starting text. Each character position gets a random start frame and end frame, both based on `time`.

- `update()`: Should be called in an `update` method. Writes the element's `innerHTML` every frame until every character has settled, then sets `is_enabled` to `false`.

### Properties

- `chars`: Characters shown while scrambling. Default `'F G H JKLTVWXYZ'`. It includes spaces, so some frames show blanks.
- `time`: Frames. A character starts scrambling within `time` frames and settles at most `time` frames later, so the effect takes at most `2 × time` frames. Default `10`.
- `is_enabled`: `true` while the effect runs.
- `el`: The element being animated.

### Example

```typescript
import { TextScrambler } from 'ohzi-components';

const title_scrambler = new TextScrambler();
title_scrambler.init();
title_scrambler.time = 20; // slower

title_scrambler.set_text(document.querySelector('.home__title'), 'Hello world');

// In your update loop
title_scrambler.update();
```

```scss
// Characters that are still scrambling
.dud {
  opacity: 0.5;
}
```

### Notes

- Characters that are still scrambling are wrapped in `<span class="dud">`. Style `.dud` to tell them apart.
- The effect counts frames, not seconds, so it runs faster at higher framerates.
- The output is written with `innerHTML`, so `new_text` is parsed as HTML. Escape text you don't control. Use plain text only: markup in `new_text` gets scrambled character by character, and markup already in the element is lost.
- Calling `set_text()` on another element before the effect ends leaves the first element half scrambled.
