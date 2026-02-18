import type { Scroll } from "../Scroll";

export class ScrollState {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    on_enter(scroll: typeof Scroll)
    {

    }

    update(scroll: typeof Scroll)
    {

    }

    on_exit(scroll: typeof Scroll)
    {

    }

    scroll_forward(scroll: typeof Scroll)
    {

    }

    scroll_backward(scroll: typeof Scroll)
    {

    }

    scroll_to(scroll: typeof Scroll, target: number)
    {

    }

    get_progress(scroll: typeof Scroll)
    {
        return 0;
    }

    set_steps(steps: number[])
    {

    }

    set_from_to(from: number, to: number)
    {

    }

    get_current_step()
    {
        return 0;
    }

    get_current_step_index()
    {
        return 0;
    }

    set_to(to: number)
    {

    }
}