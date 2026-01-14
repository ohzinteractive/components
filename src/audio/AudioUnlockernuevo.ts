class AudioUnlocker
{
  AudioContext: any;
  os: any;
  worker_to_main: any;
  constructor(os: any, audio_context: any, worker_to_main: any)
  {
    this.os = os;
    this.AudioContext = audio_context;
    this.worker_to_main = worker_to_main;

    const context = this.AudioContext.getContext();

    // Fix audio lost on safari
    context.onstatechange = (e: any) => {
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

    setTimeout(() =>
    {
      this.worker_to_main.push('audio_events.remove_listeners', [context.state]);
    }, 10);
  }
}

export { AudioUnlocker };
