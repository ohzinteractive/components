class AudioUnlocker
{
  constructor(os, audio_context)
  {
    this.os = os;
    this.AudioContext = audio_context;

    this.is_unlocked = false;
    this.unlock_bind = this.unlock.bind(this);
    this.retry_count = 0;
    this.max_retries = 3;

    window.addEventListener('click', this.unlock_bind, false);

    if (this.os.is_mobile || this.os.is_ipad)
    {
      window.addEventListener('touchstart', this.unlock_bind, false);
    }

    this.setup_visibility_listeners();
    this.setup_audio_context_listeners();
  }

  async unlock()
  {
    if (this.is_unlocked)
    {
      return;
    }

    const audio_context = this.AudioContext.getContext();

    if (audio_context.state !== 'running')
    {
      console.log('Unlocking audio, current state:', audio_context.state);
      try
      {
        await this.unlock_context();

        // Only create test buffer if context is now running
        if (audio_context.state === 'running')
        {
          // create empty buffer and play it
          const buffer = audio_context.createBuffer(1, 1, 22050);
          const source = audio_context.createBufferSource();

          source.buffer = buffer;
          source.connect(audio_context.destination);
          source.start();
        }
      }
      catch (e)
      {
        console.warn('Audio unlock failed:', e.message);
        // Don't mark as unlocked if there was an error
        return;
      }
    }

    // by checking the play state after some time, we know if we're really unlocked
    setTimeout(this.remove_listeners.bind(this), 100);
  }

  setup_visibility_listeners()
  {
    // Multiple ways to detect page visibility changes

    // Standard Page Visibility API
    document.addEventListener('visibilitychange', () =>
    {
      if (document.visibilityState === 'visible')
      {
        console.log('Page visibility changed to visible');
        // Add small delay to ensure Safari has fully restored the page
        setTimeout(() =>
        {
          this.unlock_context();
        }, 500);
      }
    });

    // Window focus/blur events (more reliable on Safari)
    window.addEventListener('focus', () =>
    {
      console.log('Window focused');
      // Reset retry count when user actively focuses the window
      this.retry_count = 0;
      // setTimeout(() => {
      //   this.unlock_context();
      // }, 50);
    });
  }

  async unlock_context()
  {
    const audio_context = this.AudioContext.getContext();

    if (audio_context.state === 'suspended' || audio_context.state === 'interrupted')
    {
      try
      {
        console.log('unlocking audio context, current state:', audio_context.state);

        // Wait for the context to resume
        await audio_context.resume();

        // Verify the context is actually running
        if (audio_context.state === 'running')
        {
          console.log('Audio context successfully resumed');
          this.retry_count = 0; // Reset retry count on success

          // Create a test gain node to ensure audio device is working
          const testGain = audio_context.createGain();
          testGain.disconnect(); // Clean up immediately
        }
        else
        {
          throw new Error(`Context state is ${audio_context.state} after resume attempt`);
        }
      }
      catch (e)
      {
        console.warn('Audio context resume failed:', e.message);
        this.handle_resume_failure(e);
      }
    }
  }

  handle_resume_failure()
  {
    this.retry_count++;

    if (this.retry_count <= this.max_retries)
    {
      console.log(`Retrying audio context resume (attempt ${this.retry_count}/${this.max_retries})`);

      // Wait a bit before retrying, with exponential backoff
      const delay = Math.min(1000 * Math.pow(2, this.retry_count - 1), 5000);

      setTimeout(() =>
      {
        this.unlock_context();
      }, delay);
    }
    else
    {
      console.error('Audio context resume failed after maximum retries. Audio may not work until page reload.');
      this.retry_count = 0; // Reset for next time
    }
  }

  setup_audio_context_listeners()
  {
    // Listen for audio context state changes
    // if (this.audio_context.addEventListener) {
    //   this.audio_context.addEventListener('statechange', () => {
    //     console.log('Audio context state changed to:', this.audio_context.state);

    //     if (this.audio_context.state === 'interrupted') {
    //       console.log('Audio context interrupted - will attempt to resume when page becomes visible');
    //     }
    //   });
    // }
  }

  remove_listeners()
  {
    const audio_context = this.AudioContext.getContext();

    if (audio_context.state === 'running')
    {
      this.is_unlocked = true;

      window.removeEventListener('click', this.unlock_bind, false);
      window.removeEventListener('touchstart', this.unlock_bind, false);
    }
  }
}

export { AudioUnlocker };
