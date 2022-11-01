# OHZI Components

## Performance Controller
- Enable or disable optional features, and/or Increase or decrease [DevicePixelRatio](https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio) depending on current frames per second (FPS).

- TODO: Explain rules.

### Methods

- `add_optional_features([...])`: Add features that can be disabled if performance is too low. It receives an array of objects that have to implement the method `disable_optional_feature`.

- `update()`: Should be called in an `update` method.
