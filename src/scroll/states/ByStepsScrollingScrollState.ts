import type { EasingFunctions } from "../../lib/EasingFunctions";
import type { OMath } from "../../lib/OMath";
import type { Time } from "../../lib/Time";
import type { Scroll } from "../Scroll";
import { ScrollState } from "./ScrollState";

class ByStepsScrollingScrollState extends ScrollState
{
  easing_functions: EasingFunctions;
  from: number;
  name: string;
  omath: OMath;
  t: number;
  time: Time;
  to: number;
  
  constructor(omath: OMath, time: Time, easing_functions: EasingFunctions)
  {
    super('by_steps_scrolling');
    
    this.omath = omath;
    this.time = time;
    this.easing_functions = easing_functions;

    this.name = 'scrolling';

    this.from = 0;
    this.to = 0;
  }

  set_to(to: number)
  {
    this.to = to;
  }

  on_enter(scroll: typeof Scroll)
  {
    this.t = 0;

    this.from = scroll.current;
  }

  update(scroll: typeof Scroll)
  {
    this.t += this.time.delta_time / scroll.duration;

    this.t = this.omath.clamp(this.t, 0, 1);

    scroll.current = this.omath.lerp(this.from, this.to, this.easing_functions.ease_in_out_cubic(this.t));

    if (this.t >= 1)
    {
      scroll.set_state(scroll.states.by_steps);
    }
  }

  on_exit(scroll: any)
  {

  }

  scroll_forward(scroll: any)
  {

  }

  scroll_backward(scroll: any)
  {

  }
}

export { ByStepsScrollingScrollState };
