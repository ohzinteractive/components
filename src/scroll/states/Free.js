export default class Free
{
  constructor(omath, os)
  {
    this.omath = omath;
    this.os = os;
  }

  set_from_to(from = -999, to = 999)
  {
    this.from = from;
    this.to = to;
  }

  on_enter(scroll)
  {

  }

  update(scroll)
  {
    if (scroll.enabled)
    {
      scroll.target += scroll.delta;

      if (Math.abs(scroll.delta) > 0)
      {
        scroll.duration = 1;
      }
    }

    const force = this.os.is_mobile ? 0.1 : this.os.is_ipad ? 0.08 : this.os.is_mac ? 0.2 : 0.05;

    scroll.target = this.omath.clamp(scroll.target, this.from, this.to);
    scroll.current += (scroll.target - scroll.current) * force / scroll.duration;
  }

  // update(scroll)
  // {
  //   if (scroll.enabled)
  //   {
  //     scroll.target += scroll.delta;
  //   }

  //   scroll.target = TMath.clamp(scroll.target, this.from, this.to);
  //   const delta = scroll.target - scroll.current;

  //   const x = 1 - (1 / (Math.abs(delta * 100) - 2));
  //   scroll.current += delta * 0.1 * x;
  // }

  on_exit(scroll)
  {

  }

  scroll_forward(scroll)
  {
    scroll.target += 1;
  }

  scroll_backward(scroll)
  {
    scroll.target -= 1;
  }

  scroll_to(scroll, target)
  {
    scroll.target = target;
  }

  get_progress(scroll)
  {
    return this.omath.linear_map(scroll.current, this.from, this.to, 0, 1);
  }
}
