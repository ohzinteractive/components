import { AudioMuffler } from './AudioMuffler';
import { AudioUnlocker } from './AudioUnlocker';

class AudioManager
{
  init(audio_listener_klass, audio_context_klass, camera_manager,
    resourse_container, time, omath, os, easing_functions)
  {
    this.AudioListener = audio_listener_klass;
    this.AudioContext = audio_context_klass;
    this.camera_manager = camera_manager;
    this.resourse_container = resourse_container;
    this.time = time;
    this.omath = omath;
    this.os = os;
    this.easing_functions = easing_functions;

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

    // this.muting_t = 0;
    // this.muting_dir = 1;

    this.muted_by_user = false;

    this.listener = undefined;
    this.user_interaction = false;

    // let sounds = [];
    // sounds = sounds.concat(test_general_sounds);
    // sounds = sounds.concat(home_sounds);

    // this.setup_sounds_names(sounds);

    this.audio_unlocker = new AudioUnlocker(this.os, this.AudioContext);

    this.bind_focus_events();
  }

  bind_focus_events()
  {
    window.addEventListener('blur', () =>
    {
      this.mute(false);
    });

    window.addEventListener('focus', () =>
    {
      if (!this.muted_by_user)
      {
        this.unmute();
      }
    });

    document.addEventListener('visibilitychange', () =>
    {
      if (document.visibilityState === 'visible')
      {
        if (!this.muted_by_user)
        {
          this.unmute();
        }
      }
      else
      {
        this.mute(false);
      }
    });
  }

  init_sounds(scene_sounds_data)
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
          this.time,
          this.omath,
          this.easing_functions
        );

        this.loop_sounds.push(sound_name);
      }
      // }
    }

    this.audio_mufflers_keys = Object.keys(this.audio_mufflers);

    if (this.sounds_to_play)
    {
      this.play([...this.sounds_to_play]);
      this.sounds_to_play = [];
    }
  }

  play(sound_names)
  {
    // console.log('play sound: ', sound_names);
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

        if (sound.positional)
        {
          this.camera_manager.current.add(this.listener);
        }

        // this.sounds[sound].audio.isPlaying = false;

      // if (this.listener.context.state === 'running')
      // {
      //   this.audio_icon_component.unmute();
      // }
      }
      else
      {
        if (sound_name)
        {
          if (!this.sounds_to_play.includes(sound_name) && sound_name !== this.sounds_names.CUBE_TRANSITION)
          {
            this.sounds_to_play.push(sound_name);
          }
        }
      }
    }
  }

  stop(sound_name)
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
      // if (Input.left_mouse_button_pressed || this.user_interaction)
      // {
      this.user_interaction = true;
      this.listener = new this.AudioListener();
      this.listener.setMasterVolume(0);
      // this.mute();

      window.user_interaction_for_audio = true;
      this.initialized = true;
      // }
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

  setup_sounds_names(sounds)
  {
    for (let i = 0; i < sounds.length; i++)
    {
      const sound = sounds[i];

      this.sounds_names[sound.name.toUpperCase()] = sound.name;
    }
  }

  get_sounds_names(sounds)
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
