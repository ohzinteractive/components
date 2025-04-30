# OHZI Components

## LottieAnimation

- Display Lottie animation.

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
})`: Initialize component.

- `lottie`: Lottie object.
- `container`: Container element.
- `url`: URL of the Lottie animation.
- `on_loaded`: Callback function when the animation is loaded.
- `on_complete`: Callback function when the animation is complete.
- `loop`: Whether the animation should loop.
- `autoplay`: Whether the animation should autoplay.
- `rendererSettings`: Renderer settings.
- `initial_segment`: Initial segment of the animation.

### Example

```javascript
const lottie = new LottieAnimation();
lottie.init({
    lottie: lottie,
    container: container,
    url: url,
});
lottie.animation.play();
```

### Events

- `on_loaded`: Callback function when the animation is loaded.
- `on_complete`: Callback function when the animation is complete.

### Properties

- `animation`: Lottie animation.
- `is_loaded`: Whether the animation is loaded.
- `is_complete`: Whether the animation is complete.
