import type { OS } from "../lib/OS";
class AudioUnlocker
{
  AudioContext: any;
  is_unlocked: boolean;
  os: OS;
  unlock_bind: () => void;
  
  constructor(os: OS, audio_context: any)
  {
    this.os = os;
    this.AudioContext = audio_context;

    this.is_unlocked = false;
    this.unlock_bind = this.unlock.bind(this) as () => void;

    window.addEventListener('click', this.unlock_bind, false);

    if (this.os.is_mobile || this.os.is_ipad)
    {
      window.addEventListener('touchstart', this.unlock_bind, false);
    }

    const context = this.AudioContext.getContext();

    // Fix audio lost on safari
    context.onstatechange = (_e: any) => {
      if (context.state === 'suspended' || context.state === 'interrupted')
      {
        context.resume();
        context.createGain();
      }
    };
  }

  unlock(): void
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

  remove_listeners(context: any): void
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
