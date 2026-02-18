import type { FPSCounter } from "../index";
import type { Graphics } from "../lib/Graphics";
import type { OMath } from "../lib/OMath";
import type { OScreen } from "../lib/OScreen";
import type { Time } from "../lib/Time";

export class PerformanceController
{
  current_optional_feature_i: number;
  fps_counter: typeof FPSCounter;
  graphics: Graphics;
  omath: OMath;
  optional_features: any;
  oscreen: OScreen;
  performance_t: number;
  settings: any;
  should_check_performance: boolean;
  threshold: boolean;
  time: Time;
  
  constructor()
  {
  }

  init(omath: OMath, settings: any, graphics: Graphics, time: Time, oscreen: OScreen, fps_counter: typeof FPSCounter)
  {
    this.omath = omath;
    this.settings = settings;
    this.graphics = graphics;
    this.time = time;
    this.oscreen = oscreen;
    this.fps_counter = fps_counter;

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

  add_optional_features(features: any[])
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
      this.fps_counter.update();

      this.__check_performance();
    }
  }

  __check_performance()
  {
    if (this.performance_t > 2)
    {
      if (this.fps_counter.avg < 30)
      {
        this.__reduce_dpr();
      }
      else if (this.fps_counter.avg >= 60)
      {
        if (!this.threshold)
        {
          this.__increase_dpr();
        }
      }
      else if (this.fps_counter.avg < 60)
      {
        if (!this.threshold)
        {
          if (this.settings.dpr > 1)
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
      this.settings.dpr -= 0.25;
      this.settings.dpr = this.omath.clamp(this.settings.dpr, 0.75, window.devicePixelRatio * 1.25);
    }

    // console.log('reduce', this.fps_counter.avg,  this.fps_counter.fps_samples);
    this.fps_counter.reset();
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
    this.settings.dpr += 0.25;
    this.settings.dpr = this.omath.clamp(this.settings.dpr, 1, window.devicePixelRatio * 1.25);

    // console.log('increase', this.fps_counter.avg,  this.fps_counter.fps_samples);
    // this.fps_counter.reset();
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
