import type { OMath } from "../../lib/OMath";
import type { OS } from "../../lib/OS";
import type { Scroll } from "../Scroll";
import { ScrollState } from "./ScrollState";

class FreeScrollState extends ScrollState
{
  force: number;
  from: number;
  omath: OMath;
  os: OS;
  sensitivity: number;
  to: number;
  
  constructor(omath: OMath, os: OS)
  {
    super('free');

    this.omath = omath;
    this.os = os;

    this.sensitivity = 0.2;
    this.force = 0.2;
  }

  set_from_to(from = -999, to = 999)
  {
    this.from = from;
    this.to = to;
  }

  set_sensitivity(sensitivity: number)
  {
    this.sensitivity = sensitivity;
  }

  on_enter(scroll: typeof Scroll)
  {

  }

  update(scroll: typeof Scroll)
  {
    if (scroll.enabled)
    {
      scroll.target += scroll.delta * this.sensitivity;

      if (Math.abs(scroll.delta) > 0)
      {
        scroll.duration = 1;
      }
    }

    scroll.target = this.omath.clamp(scroll.target, this.from, this.to);

    const deltaTime = scroll.time.delta_time;
    const rate = this.force / scroll.duration;

    // Framerate independent lerp calculation
    // Using exponential decay: new_value = target + (current - target) * exp(-rate * deltaTime)
    const decay = Math.exp(-rate * deltaTime * scroll.framerate);

    scroll.current = scroll.target + (scroll.current - scroll.target) * decay;
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

  on_exit(scroll: typeof Scroll)
  {

  }

  scroll_forward(scroll: typeof Scroll)
  {
    scroll.target += 1;
  }

  scroll_backward(scroll: typeof Scroll)
  {
    scroll.target -= 1;
  }

  scroll_to(scroll: typeof Scroll, target: number)
  {
    scroll.target = target;
  }

  get_progress(scroll: typeof Scroll)
  {
    return this.omath.linear_map(scroll.current, this.from, this.to, 0, 1);
  }
}

export { FreeScrollState };
