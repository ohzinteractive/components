import type { OMath } from "../../lib/OMath";
import type { OS } from "../../lib/OS";
import type { Time } from "../../lib/Time";
import type { Scroll } from "../Scroll";
import { ScrollState } from "./ScrollState";

class ByStepsScrollState extends ScrollState
{
  current_cooldown: number;
  current_step_index: number;
  omath: OMath;
  os: OS;
  steps: number[];
  time: Time;
  
  constructor(omath: OMath, os: OS, time: Time)
  {
    super('by_steps');

    this.omath = omath;
    this.os = os;
    this.time = time;
  }

  set_steps(steps: number[])
  {
    this.steps = steps;
    this.current_step_index = 0;
    this.current_cooldown = 0;
  }

  on_enter(scroll: typeof Scroll)
  {

  }

  update(scroll: typeof Scroll)
  {
    const sensitivity = this.os.is_mobile ? 0.3 : this.os.is_ipad ? 0.5 : this.os.is_mac ? 0.1 : 0;

    if (scroll.enabled)
    {
      if (scroll.delta > sensitivity)
      {
        if (this.can_scroll_forward())
        {
          this.scroll_forward(scroll);
        }
      }

      if (scroll.delta < -sensitivity)
      {
        if (this.can_scroll_backward())
        {
          this.scroll_backward(scroll);
        }
      }
    }

    this.current_cooldown -= this.time.delta_time;
    this.current_cooldown = this.omath.clamp(this.current_cooldown--, 0, 2);
  }

  scroll_forward(scroll: typeof Scroll)
  {
    this.current_step_index++;
    scroll.current_cooldown = scroll.default_cooldown;

    scroll.states.by_steps_scrolling.set_to(this.steps[this.current_step_index]);

    scroll.set_state(scroll.states.by_steps_scrolling);
  }

  scroll_backward(scroll: typeof Scroll)
  {
    this.current_step_index--;
    scroll.current_cooldown = scroll.default_cooldown;

    scroll.states.by_steps_scrolling.set_to(this.steps[this.current_step_index]);

    scroll.set_state(scroll.states.by_steps_scrolling);
  }

  on_exit(scroll: typeof Scroll)
  {

  }

  get_progress(scroll: typeof Scroll)
  {
    return (Math.abs(scroll.current) - Math.abs(this.steps[0])) / (Math.abs(this.steps[this.steps.length - 1]) - Math.abs(this.steps[0]));
  }

  get_current_step()
  {
    return this.steps[this.current_step_index];
  }

  can_scroll_forward()
  {
    return (this.current_step_index + 1) < this.steps.length && this.current_cooldown < 0.1;
  }

  can_scroll_backward()
  {
    return (this.current_step_index - 1) >= 0 && this.current_cooldown < 0.1;
  }

  get_current_step_index()
  {
    return this.current_step_index;
  }
}

export { ByStepsScrollState };
