import type { AudioManager } from './AudioManager.js';
export class AudioEvents
{
  audio_manager: typeof AudioManager;
  
  constructor(audio_manager: typeof AudioManager)
  {
    this.audio_manager = audio_manager;
  }

  init()
  {
    this.bind_focus_events();
  }

  bind_focus_events()
  {
    window.addEventListener('blur', () =>
    {
      this.audio_manager.on_blur();
    });

    window.addEventListener('focus', () =>
    {
      this.audio_manager.on_focus();
    });

    document.addEventListener('visibilitychange', () =>
    {
      if (document.visibilityState === 'visible')
      {
        this.audio_manager.on_focus();
      }
      else
      {
        this.audio_manager.on_blur();
      }
    });
  }
}
