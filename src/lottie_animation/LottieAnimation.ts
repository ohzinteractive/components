class LottieAnimation
{
  animation: any;
  lottie: any;
  
  constructor()
  {
  }

  init({
    lottie,
    container,
    url,

    on_loaded = () =>
    {},

    on_complete = () =>
    {},

    loop = false,
    autoplay = false,
    rendererSettings = {},
    initial_segment
  }: any)
  {
    this.lottie = lottie;

    this.animation = lottie.loadAnimation({
      container: container,
      renderer: 'svg',
      loop: loop,
      autoplay: autoplay,
      path: url,
      rendererSettings: rendererSettings,
      initialSegment: initial_segment
    });

    this.animation.addEventListener('DOMLoaded', on_loaded);
    this.animation.addEventListener('complete', on_complete);

    return this.animation;
  }
}

export { LottieAnimation };
