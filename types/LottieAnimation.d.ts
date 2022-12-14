export class LottieAnimation {
    lottie: any;
    animation: any;
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
      }: {
        lottie: any,
        container: HTMLElement,
        url: string,
        on_loaded?: Function,
        on_complete?: Function,
        loop?: boolean,
        autoplay?: boolean,
        rendererSettings?: object,
        initial_segment?: Array<any>
      }): void;
}
