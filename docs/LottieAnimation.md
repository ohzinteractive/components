# OHZI Components

## LottieAnimation

- Display Lottie animation.
- Thin wrapper over [lottie-web](https://github.com/airbnb/lottie-web)'s `loadAnimation()` that always uses the `svg` renderer.
- Class. Create one per animation with `new`.

### Methods

- `init({
    lottie,
    container,
    url,
    on_loaded = () => {},
    on_complete = () => {},
    loop = false,
    autoplay = false,
    rendererSettings = {},
    initial_segment
})`: Initialize component. Loads the animation and returns the lottie-web `AnimationItem` (also stored in `animation`).

- `lottie`: The lottie-web module (`import lottie from 'lottie-web'`). Neither `ohzi-components` nor the boilerplate ships it, so add it to the app.
- `container`: Element the SVG is added to.
- `url`: URL of the Lottie JSON file.
- `on_loaded`: Callback function when the animation is loaded and its SVG is built (lottie-web's `DOMLoaded` event).
- `on_complete`: Callback function when the animation is complete (lottie-web's `complete` event).
- `loop`: `true`, `false`, or the number of times to play.
- `autoplay`: Whether the animation starts playing once loaded.
- `rendererSettings`: lottie-web renderer settings, e.g. `{ preserveAspectRatio: 'xMidYMid slice' }`.
- `initial_segment`: `[start_frame, end_frame]` to play instead of the whole animation.

### Example

```typescript
import lottie from 'lottie-web';
import { LottieAnimation } from 'ohzi-components';

const intro_animation = new LottieAnimation();

intro_animation.init({
  lottie: lottie,
  container: document.querySelector('.home__intro'),
  url: '/animations/intro.json',
  on_loaded: () => intro_animation.animation.play(),
  on_complete: () => console.log('Intro done')
});
```

### Events

- `on_loaded`: Callback function when the animation is loaded.
- `on_complete`: Callback function when the animation is complete.

### Properties

- `animation`: The lottie-web `AnimationItem`. Use it to `play()`, `pause()`, `goToAndStop()`, `setSpeed()` or `destroy()`.
- `lottie`: The lottie-web module passed to `init()`.

### Notes

- `on_complete` doesn't fire while `loop` is `true`. lottie-web fires `loopComplete` instead, which you can listen to on `animation`.
- There is no dispose method. Call `animation.destroy()` to remove the SVG and its listeners.
