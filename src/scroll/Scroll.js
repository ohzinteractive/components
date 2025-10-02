import { ByStepsScrollState } from './states/ByStepsScrollState';
import { ByStepsScrollingScrollState } from './states/ByStepsScrollingScrollState';

import { FreeByStepsScrollState } from './states/FreeByStepsScrollState';
import { FreeScrollState } from './states/FreeScrollState';

class Scroll
{
  constructor()
  {
  }

  init(input, os, omath, time, easing_functions)
  {
    this.input = input;
    this.os = os;
    this.omath = omath;
    this.time = time;
    this.easing_functions = easing_functions;

    this.delta = 0;

    this.current = 0;
    this.target = 0;

    this.duration = 1;
    this.default_cooldown = 1.4;

    this.framerate = 60;

    this.current_state = undefined;

    this.enabled = true;

    this.states = {
      by_steps: new ByStepsScrollState(this.omath, this.os, this.time),
      by_steps_scrolling: new ByStepsScrollingScrollState(this.omath, this.time, this.easing_functions),
      free: new FreeScrollState(this.omath, this.os),
      free_by_steps: new FreeByStepsScrollState(this.os, this.omath, this.time)
    };

    this.current_state = this.states.free;
  }

  get is_scrolling()
  {
    return this.delta > 0 || this.delta < 0;
  }

  enable()
  {
    this.enabled = true;
  }

  disable()
  {
    this.enabled = false;
  }

  set_free_scrolling_by_steps(steps, reset = true)
  {
    if (reset)
    {
      this.reset(steps[0]);
    }

    this.states.free_by_steps.set_steps(steps);
    this.set_state(this.states.free_by_steps);
  }

  set_free_scrolling(from, to, reset = true)
  {
    this.states.free.set_from_to(from, to);
    this.set_state(this.states.free);

    if (reset)
    {
      this.reset(from);
    }
  }

  set_step_scrolling(steps, reset = true)
  {
    this.states.by_steps.set_steps(steps);
    this.set_state(this.states.by_steps);

    if (reset)
    {
      this.reset(steps[0]);
    }
  }

  set_state(new_state)
  {
    this.current_state.on_exit(this);
    this.current_state = new_state;
    this.current_state.on_enter(this);
  }

  scroll_forward()
  {
    this.current_state.scroll_forward(this);
  }

  scroll_backward()
  {
    this.current_state.scroll_backward(this);
  }

  scroll_to(target)
  {
    this.current_state.scroll_to(this, target);
  }

  reset(target = 0)
  {
    this.current = target;
    this.target = target;
    this.duration = 1;
  }

  get_progress()
  {
    return this.current_state.get_progress(this);
  }

  get_current_step()
  {
    return this.current_state.get_current_step();
  }

  get_current_step_index()
  {
    return this.current_state.get_current_step_index();
  }

  update(delta_x = this.input.pointer_pos_delta.x, delta_y = this.input.pointer_pos_delta.y)
  {
    // this.delta = (this.os.is_mobile || this.os.is_ipad) ? delta_y * 0.03 : this.input.scroll_delta;
    const delta_mobile = delta_x * 0.02 + -delta_y * 0.02;
    let delta_desktop = this.input.scroll_delta;

    if (this.input.left_mouse_button_down)
    {
      delta_desktop -= delta_mobile;
    }

    this.delta = this.os.is_mobile ? delta_mobile : delta_desktop;
    this.delta = this.os.is_mac || this.os.is_ipad || this.os.is_android ? -this.delta : this.delta;
    this.delta = this.os.is_mac ? this.delta * 0.5 : this.delta;

    this.current_state.update(this);

    // this.enabled = this.input.enabled;
  }
}

const scroll = new Scroll();
export { scroll as Scroll };
