class ByStepsScrollingScrollState
{
  constructor(omath, time, easing_functions)
  {
    this.omath = omath;
    this.time = time;
    this.easing_functions = easing_functions;

    this.name = 'scrolling';
  }

  set_to(to)
  {
    this.to = to;
  }

  on_enter(scroll)
  {
    this.t = 0;

    this.from = scroll.current;
  }

  update(scroll)
  {
    this.t += this.time.delta_time / scroll.duration;

    this.t = this.omath.clamp(this.t, 0, 1);

    scroll.current = this.omath.lerp(this.from, this.to, this.easing_functions.ease_in_out_cubic(this.t));

    if (this.t >= 1)
    {
      scroll.set_state(scroll.states.by_steps);
    }
  }

  on_exit(scroll)
  {

  }

  scroll_forward(scroll)
  {

  }

  scroll_backward(scroll)
  {

  }
}

export { ByStepsScrollingScrollState };
