export class LottieAnimation {
    init({ lottie, container, url, on_loaded, on_complete, loop, autoplay, rendererSettings, initial_segment }: {
        lottie: any;
        container: any;
        url: any;
        on_loaded?: () => void;
        on_complete?: () => void;
        loop?: boolean;
        autoplay?: boolean;
        rendererSettings?: {};
        initial_segment: any;
    }): any;
    lottie: any;
    animation: any;
}
