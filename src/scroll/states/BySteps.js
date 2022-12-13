export default class BySteps
{
  constructor(omath, os, time)
  {
    this.omath = omath;
    this.os = os;
    this.time = time;

    this.name = 'idle';
  }

  set_steps(steps)
  {
    this.steps = steps;
    this.current_step_index = 0;
    this.current_cooldown = 0;
  }

  on_enter(scroll)
  {

  }

  update(scroll)
  {
    const sensitivity = this.os.is_mobile ? 0.3 : this.os.is_ipad ? 0.5 : 0;

    if (scroll.enabled)
    {
      if (scroll.delta > sensitivity)
      {
        if (scroll.can_scroll_forward())
        {
          this.scroll_forward(scroll);
        }
      }

      if (scroll.delta < -sensitivity)
      {
        if (scroll.can_scroll_backward())
        {
          this.scroll_backward(scroll);
        }
      }
    }

    this.current_cooldown -= this.time.delta_time;
    this.current_cooldown = this.omath.clamp(this.current_cooldown--, 0, 2);
  }

  scroll_forward(scroll)
  {
    this.current_step_index++;
    scroll.current_cooldown = scroll.default_cooldown;

    scroll.states.by_steps_scrolling.set_to(scroll.steps[scroll.current_step_index]);
    scroll.set_state(this.states.by_steps_scrolling);
  }

  scroll_backward(scroll)
  {
    this.current_step_index--;
    scroll.current_cooldown = scroll.default_cooldown;

    scroll.states.by_steps_scrolling.set_to(scroll.steps[scroll.current_step_index]);
    scroll.set_state(this.states.by_steps_scrolling);
  }

  on_exit(scroll)
  {

  }

  get_progress(scroll)
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
