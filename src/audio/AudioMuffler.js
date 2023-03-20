
class AudioMuffler
{
  constructor(sound_name, sound, time, omath, easing_functions)
  {
    this.time = time;
    this.omath = omath;
    this.easing_functions = easing_functions;

    this.sound_name = sound_name;
    this.sound = sound;
    this.t = 0;
    this.dir = 1;
    this.speed = 0.3;

    this.changing = false;
  }

  stop()
  {
    if (this.sound.is_playing)
    {
      this.changing = true;

      this.dir = -1;
    }
  }

  play()
  {
    this.changing = true;
    this.dir = 1;

    if (!this.sound.is_playing)
    {
      // this.sound.audio.setVolume(0);
      this.sound.play();
    }
  }

  update()
  {
    if (this.changing)
    {
      this.t += this.time.delta_time * this.speed * this.dir;
      this.t = this.omath.clamp(this.t, 0, 1);

      const volume = this.omath.linear_map(
        this.easing_functions.ease_in_out_cubic(this.t), 0, 1,
        0,
        this.sound.volume
      );

      this.sound.audio.setVolume(volume);

      if (this.t >= 1 || this.t <= 0)
      {
        this.changing = false;

        if (this.dir === -1)
        {
          this.sound.stop();
        }
      }
    }
  }
}

export { AudioMuffler };
