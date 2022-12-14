import * as lottie from 'lottie-web';

export default class LottieAnimation
{
  constructor({
    container,
    path,
    on_loaded = () =>
    {},
    on_complete = () =>
    {},
    loop = false,
    autoplay = false,
    rendererSettings = {},
    initial_segment
  })
  {
    this.animation = lottie.loadAnimation({
      container: container,
      renderer: 'svg',
      loop: loop,
      autoplay: autoplay,
      path: path,
      rendererSettings: rendererSettings,
      initialSegment: initial_segment
    });

    this.animation.addEventListener('DOMLoaded', on_loaded);
    this.animation.addEventListener('complete', on_complete);

    return this.animation;
  }
}
