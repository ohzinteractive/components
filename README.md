# OHZI Components

OHZI Components is a library that collects a bunch of standalone Classes to help build high-quality [WebGL](https://www.khronos.org/webgl/) and [WebGPU](https://webgpu.org/) experiences fast.

This library is a complement of [ohzi-core](https://github.com/ohzinteractive/core).

## Documentation

- [Audio](docs/Audio.md) — `AudioManager` plays, fades and mutes the ohzi-core audio clips, and `AudioUnlocker` resumes the `AudioContext` after the first gesture.
- [FPSCounter](docs/FPSCounter.md) — Frames per second, averaged over the last 5 seconds.
- [LottieAnimation](docs/LottieAnimation.md) — Loads a Lottie animation with lottie-web's SVG renderer.
- [Modal](docs/Modal.md) — `AbstractModalComponent` and `ModalState`: one overlay that shows one of several states.
- [PerformanceController](docs/PerformanceController.md) — Disables optional features and adjusts the DPR to keep the framerate up.
- [RequestManager](docs/RequestManager.md) — JSON HTTP requests sent from a Web Worker.
- [Scroll](docs/Scroll.md) — Smoothed scroll value from wheel, touch and drag, with free, snapping and step modes.
- [TextScrambler](docs/TextScrambler.md) — Scramble-reveal effect for an element's text.
- [UICollisionLayer](docs/UICollisionLayer.md) — Tracks whether the pointer is over the DOM UI and writes it to `input.over_ui`.

License
----

MIT
