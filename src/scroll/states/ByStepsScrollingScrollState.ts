class ByStepsScrollingScrollState
{
  easing_functions: any;
  from: any;
  name: any;
  omath: any;
  t: any;
  time: any;
  to: any;
  
  constructor(omath: any, time: any, easing_functions: any)
  {
    this.omath = omath;
    this.time = time;
    this.easing_functions = easing_functions;

    this.name = 'scrolling';

    this.from = 0;
    this.to = 0;
  }

  set_to(to: any)
  {
    this.to = to;
  }

  on_enter(scroll: any)
  {
    this.t = 0;

    this.from = scroll.current;
  }

  update(scroll: any)
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
