import { AudioEvents } from './AudioEvents';
import { AudioMuffler } from './AudioMuffler';

class AudioManager
{
  AudioListener: any;
  audio_events: any;
  audio_mufflers: any;
  audio_mufflers_keys: any;
  first_time_unmute: any;
  initialized: any;
  listener: any;
  loop_sounds: any;
  max_volume: any;
  muted: any;
  muted_by_user: any;
  muting: any;
  paused_sounds: any;
  resourse_container: any;
  sounds: any;
  sounds_names: any;
  sounds_to_play: any;
  time: any;
  
  init(audio_listener_klass: any, resourse_container: any, time: any)
  {
    this.AudioListener = audio_listener_klass;
    this.resourse_container = resourse_container;
    this.time = time;

    this.initialized = false;
    this.max_volume = 0.9;

    this.sounds_names = {};

    this.sounds = {};

    this.loop_sounds = [];

    this.audio_mufflers = {};
    this.audio_mufflers_keys = [];

    this.sounds_to_play = [];

    this.first_time_unmute = false;

    this.muted = true;
    this.muting = false;

    this.paused_sounds = [];

    // this.muting_t = 0;
    // this.muting_dir = 1;

    this.muted_by_user = false;

    this.listener = undefined;
    // this.user_interaction = false;

    // let sounds = [];
    // sounds = sounds.concat(test_general_sounds);
    // sounds = sounds.concat(home_sounds);

    // this.setup_sounds_names(sounds);

    this.audio_events = new AudioEvents(this);
    this.audio_events.init();
  }

  init_sounds(scene_sounds_data: any)
  {
    const sound_names = this.get_sounds_names(scene_sounds_data);

    for (let i = 0; i < sound_names.length; i++)
    {
      const sound_name = sound_names[i];

      // if (!this.sounds[sound_name])
      // {
      this.sounds[sound_name] = this.resourse_container.get(sound_name);
      this.sounds[sound_name].init(this.listener);

      if (this.sounds[sound_name].loop)
      {
        this.audio_mufflers[sound_name] = new AudioMuffler(
          sound_name,
          this.sounds[sound_name],
          this.time
        );

        this.loop_sounds.push(sound_name);
      }
      // }
    }

    this.audio_mufflers_keys = Object.keys(this.audio_mufflers);

    if (this.sounds_to_play.length > 0)
    {
      this.play([...this.sounds_to_play]);
      this.sounds_to_play = [];
    }
  }

  play(sound_names_array: any)
  {
    let sound_names = sound_names_array;

    if (Array.isArray(sound_names_array) === false)
    {
      sound_names = [sound_names_array];
    }

    for (let i = 0; i < sound_names.length; i++)
    {
      const sound_name = sound_names[i];
      const sound = this.sounds[sound_name];

      if (sound)
      {
        if (sound.loop)
        {
          this.stop_all_loop_sounds(sound_names);
          this.audio_mufflers[sound_name].play();
        }
        else
        {
          if (sound.is_playing)
          {
            sound.stop();
          }

          sound.play();
        }

        // TODO: move outside of this class
        // if (sound.positional)
        // {
        //   this.camera_manager.current.add(this.listener);
        // }

        // this.sounds[sound].audio.isPlaying = false;

      // if (this.listener.context.state === 'running')
      // {
      //   this.audio_icon_component.unmute();
      // }
      }
      else
      {
        const sound_names_keys = Object.keys(this.sounds_names);

        if (sound_names_keys.includes(sound_name.toUpperCase()))
        {
          if (!this.sounds_to_play.includes(sound_name))
          {
            this.sounds_to_play.push(sound_name);
          }
        }
        else
        {
          console.warn('Sound not found:', sound_name);
        }
      }
    }
  }

  pause(sound_name: any)
  {
    if (this.sounds[sound_name])
    {
      if (this.sounds[sound_name].is_playing)
      {
        this.sounds[sound_name].pause();
        this.paused_sounds.push(this.sounds[sound_name]);
      }
    }
  }

  unpause_sounds()
  {
    for (let i = 0; i < this.paused_sounds.length; i++)
    {
      const paused_sound = this.paused_sounds[i];
      paused_sound.play();
    }
  }

  stop(sound_name: any)
  {
    if (this.sounds[sound_name])
    {
      if (this.sounds[sound_name].is_playing)
      {
        this.sounds[sound_name].stop();
      }
    }
  }

  mute(muted_by_user = true)
  {
    if (!this.muted)
    {
      this.muted = true;
      this.listener.setMasterVolume(0);
      this.muted_by_user = muted_by_user;

      // this.muting = true;
      // this.muting_t = this.max_volume;
      // this.muting_dir = -1;
    }
  }

  unmute()
  {
    if (this.muted)
    {
      this.muted = false;

      if (this.listener)
      {
        this.listener.setMasterVolume(this.max_volume);
      }

      // this.muting = true;
      // this.muting_t = 0;
      // this.muting_dir = 1;
    }
  }

  on_blur()
  {
    this.mute(false);
  }

  on_focus()
  {
    if (!this.muted_by_user)
    {
      this.unmute();
    }
  }

  update()
  {
    for (let i = 0; i < this.audio_mufflers_keys.length; i++)
    {
      const audio_muffler = this.audio_mufflers[this.audio_mufflers_keys[i]];
      audio_muffler.update();
    }

    // if (this.muting)
    // {
    //   this.muting_t += this.time.delta_time * this.muting_dir;
    //   this.muting_t = this.omath.clamp(this.muting_t, 0, this.max_volume);

    //   if (this.listener)
    //   {
    //     this.listener.setMasterVolume(this.muting_t);
    //   }

    //   if (this.muting_t === 0 || this.muting_t === this.max_volume)
    //   {
    //     this.muting = false;
    //   }
    // }

    if (!this.initialized)
    {
      this.listener = new this.AudioListener();
      this.listener.setMasterVolume(0);
      // this.mute();

      this.initialized = true;
    }
    else
    {
      if (!this.first_time_unmute)
      {
        // Uncomment this if you want audio at the beggining
        this.unmute();
        this.first_time_unmute = true;
        // this.mute();
      }
    }
  }

  // @ts-expect-error TS(7006): Parameter 'except_sound_names' implicitly has an '... Remove this comment to see the full error message
  stop_all_sounds(except_sound_names = [])
  {
    const sound_names = Object.keys(this.sounds);

    for (let i = 0; i < sound_names.length; i++)
    {
      const sound_name = sound_names[i];

      if (!except_sound_names.includes(sound_name))
      {
        this.stop(sound_name);
      }
    }
  }

  // @ts-expect-error TS(7006): Parameter 'except_sound_names' implicitly has an '... Remove this comment to see the full error message
  stop_all_loop_sounds(except_sound_names = [])
  {
    for (let i = 0; i < this.loop_sounds.length; i++)
    {
      const loop_sound = this.loop_sounds[i];

      if (!except_sound_names.includes(loop_sound))
      {
        this.audio_mufflers[loop_sound].stop();
      }
    }
  }

  setup_sounds_names(sounds: any)
  {
    for (let i = 0; i < sounds.length; i++)
    {
      const sound = sounds[i];

      this.sounds_names[sound.name.toUpperCase()] = sound.name;
    }
  }

  get_sounds_names(sounds: any)
  {
    const sounds_names = [];

    for (let i = 0; i < sounds.length; i++)
    {
      const sound = sounds[i];

      sounds_names.push(sound.name);
    }

    return sounds_names;
  }
}

const audio_manager = new AudioManager();
export { audio_manager as AudioManager };
