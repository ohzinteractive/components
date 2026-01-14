class FreeByStepsScrollState
{
  constructor(os, omath, time)
  {
    this.os = os;
    this.omath = omath;
    this.time = time;

    this.speed = this.os.is_mac ? 5 : this.os.is_mobile ? 3 : 1;
    // this.speed = 1;

    // this.snap_speed = this.os.is_mac ? 5 : this.os.is_mobile ? 5 : 7;
    this.snap_speed = 4;

    this.velocity = 0;

    // this.threshold = this.os.is_mac ? 0.5 : this.os.is_mobile ? 0.5 : 0.05;
    this.threshold = 0.05;
  }

  set_steps(steps)
  {
    this.steps = steps;
  }

  on_enter(scroll)
  {
    this.current_step = 0;
  }

  find_nearest_step(x, dir)
  {
    // const min_distance = 99999;
    // const min_step = -1;

    for (let i = 0; i < this.steps.length - 1; i++)
    {
      // const step = this.steps[i];
      // const distance = Math.abs(x - step);

      // if (distance < min_distance)
      // {
      //   min_step = step;
      //   min_distance = distance;
      // }

      // return min_step;

      if (this.omath.between(x, this.steps[i], this.steps[i + 1]))
      {
        if (dir > 0)
        {
          return this.steps[i + 1];
        }
        else
        {
          return this.steps[i];
        }
      }
    }

    return this.steps[0];
  }

  update(scroll)
  {
    this.velocity += scroll.delta * this.speed;

    scroll.current += this.velocity * this.time.delta_time;

    const closest_point = this.find_nearest_step(scroll.current, this.velocity);
    // console.log(Math.abs(this.velocity) / this.threshold);
    const force_toggle_fuel = Math.min(this.omath.clamp(Math.abs(this.velocity) / this.threshold, -1, 1), 1);
    // const force_toggle_fuel = Math.abs(this.velocity) / this.threshold;
    const force_toggle = Math.round(1 - force_toggle_fuel);
    // const force_toggle = 1 - force_toggle_fuel;
    const force = this.time.delta_time * force_toggle;

    // const force = 0.016;
    // console.log(force_toggle);
    const force_to_step = (closest_point - scroll.current) * force * this.snap_speed;
    // console.log(force_to_step);
    scroll.current += force_to_step;

    scroll.current = this.omath.clamp(scroll.current, this.steps[0], this.steps[this.steps.length - 1]);
    // console.log(scroll.current);
    this.velocity *= 0.9;
  }

  on_exit(scroll)
  {

  }

  scroll_forward(scroll)
  {
    // const step = this.find_nearest_step(scroll.current, 1);

    // scroll.delta += step / 2;
    // this.update(scroll);
  }

  scroll_backward(scroll)
  {
    // const step = this.find_nearest_step(scroll.current, 1);

    // scroll.delta -= step / 2;
    // this.update(scroll);
  }

  scroll_to(scroll, target)
  {
    console.warn('implement');
    // scroll.target = target;
  }

  get_progress(scroll)
  {
    return (Math.abs(scroll.current) - Math.abs(this.steps[0])) / (Math.abs(this.steps[this.steps.length - 1]) - Math.abs(this.steps[0]));
  }
}

export { FreeByStepsScrollState };
