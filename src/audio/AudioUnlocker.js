class AudioUnlocker
{
  constructor(os, audio_context)
  {
    this.os = os;
    this.AudioContext = audio_context;

    this.is_unlocked = false;
    this.unlock_bind = this.unlock.bind(this);

    window.addEventListener('click', this.unlock_bind, false);

    if (this.os.is_mobile)
    {
      window.addEventListener('touchstart', this.unlock_bind, false);
    }

    const context = this.AudioContext.getContext();

    // Fix audio lost on safari
    context.onstatechange = (e) =>
    {
      console.log(context.state);
      if (context.state === 'suspended' || context.state === 'interrupted')
      {
        context.resume();
        context.createGain();
      }
    };
  }

  unlock()
  {
    if (this.is_unlocked)
    {
      return;
    }

    const context = this.AudioContext.getContext();

    if (context.state !== 'running')
    {
      console.log(context.state);
      context.resume();
      context.createGain();

      // create empty buffer and play it
      const buffer = context.createBuffer(1, 1, 22050);
      const source = context.createBufferSource();

      source.buffer = buffer;
      source.connect(context.destination);
      source.start();
    }

    // by checking the play state after some time, we know if we're really unlocked
    setTimeout(this.remove_listeners.bind(this, context), 10);
  }

  remove_listeners(context)
  {
    if (context.state === 'running')
    {
      this.is_unlocked = true;

      window.removeEventListener('click', this.unlock_bind, false);
      window.removeEventListener('touchstart', this.unlock_bind, false);
    }
  }
}

export { AudioUnlocker };
