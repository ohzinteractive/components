import { FPSCounter } from './FPSCounter';

class PerformanceController
{
  constructor()
  {
  }

  init(omath, configuration, graphics, time, oscreen)
  {
    this.omath = omath;
    this.configuration = configuration;
    this.graphics = graphics;
    this.time = time;
    this.oscreen = oscreen;

    this.should_check_performance = true;
    this.performance_t = 0;
    this.threshold = false;

    this.optional_features = [];
    this.current_optional_feature_i = 0;

    window.addEventListener('focus', this.on_focus_in.bind(this), false);
    window.addEventListener('blur', this.on_focus_out.bind(this), false);
  }

  on_focus_in()
  {
    this.should_check_performance = true;
    this.performance_t = 0;
  }

  on_focus_out()
  {
    this.should_check_performance = false;
  }

  add_optional_features(features)
  {
    for (let i = 0; i < features.length; i++)
    {
      const feature = features[i];
      this.optional_features.push(feature);
    }
  }

  update()
  {
    if (this.should_check_performance)
    {
      FPSCounter.update();

      this.__check_performance();
    }
  }

  __check_performance()
  {
    if (this.performance_t > 2)
    {
      if (FPSCounter.avg < 30)
      {
        this.__reduce_dpr();
      }
      else if (FPSCounter.avg >= 60)
      {
        if (!this.threshold)
        {
          this.__increase_dpr();
        }
      }
      else if (FPSCounter.avg < 60)
      {
        if (!this.threshold)
        {
          if (this.configuration.dpr > 1)
          {
            this.__reduce_dpr(true);
            this.threshold = true;
          }
        }
      }
    }

    this.performance_t += this.time.delta_time;
  }

  __reduce_dpr(force_dpr = false)
  {
    if (!force_dpr && this.current_optional_feature_i < this.optional_features.length)
    {
      this.optional_features[this.current_optional_feature_i].disable_optional_feature();
      this.current_optional_feature_i++;
    }
    else
    {
      this.configuration.dpr -= 0.25;
      this.configuration.dpr = this.omath.clamp(this.configuration.dpr, 0.75, window.devicePixelRatio * 1.25);
    }

    // console.log('reduce', FPSCounter.avg,  FPSCounter.fps_samples);
    FPSCounter.reset();
    this.performance_t = 0;

    this.graphics.on_resize([{
      contentRect: {
        x: this.oscreen.position.x,
        y: this.oscreen.position.y,
        width: this.oscreen.width,
        height: this.oscreen.height
      }
    }]);
  }

  __increase_dpr()
  {
    this.configuration.dpr += 0.25;
    this.configuration.dpr = this.omath.clamp(this.configuration.dpr, 1, window.devicePixelRatio * 1.25);

    // console.log('increase', FPSCounter.avg,  FPSCounter.fps_samples);
    // FPSCounter.reset();
    this.performance_t = 0;

    this.graphics.on_resize([{
      contentRect: {
        x: this.oscreen.position.x,
        y: this.oscreen.position.y,
        width: this.oscreen.width,
        height: this.oscreen.height
      }
    }]);
  }
}

export { PerformanceController };
