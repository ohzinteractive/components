
class AudioMuffler
{
  constructor(sound_name, sound, time)
  {
    this.time = time;

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
      this.t = this.clamp(this.t, 0, 1);

      const volume = this.linear_map(
        this.ease_in_out_cubic(this.t), 0, 1,
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

  clamp(value, min, max)
  {
    return Math.max(min, Math.min(max, value));
  }

  ease_in_out_cubic(x)
  {
    return x < 0.5
      ? 4 * x * x * x
      : 1 - Math.pow(-2 * x + 2, 3) / 2;
  }

  linear_map(value,
    from_range_start_value,
    from_range_end_value,
    to_range_start_value,
    to_range_end_value)
  {
    return ((value - from_range_start_value) / (from_range_end_value - from_range_start_value)) * (to_range_end_value - to_range_start_value) + to_range_start_value;
  }
}

export { AudioMuffler };
