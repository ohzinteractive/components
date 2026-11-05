# OHZI Components

## Audio
- Plays the ohzi-core `AudioClip` resources through one shared three.js `AudioListener`.
- Loop sounds fade in and out, and only one loop sound plays at a time.
- Mutes when the window loses focus or the tab is hidden, and unmutes when it comes back.
- Two exports:
  - `AudioManager` plays, pauses, stops and mutes sounds.
  - `AudioUnlocker` resumes the browser's `AudioContext` after the first user gesture.

## AudioManager
- Singleton. `import { AudioManager } from 'ohzi-components'` gives you the instance, so don't call `new`.

### Methods

- `init(AudioListener, resource_container, time)`: Initialize component.
  - `AudioListener`: The three.js `AudioListener` **class**, not an instance. The manager creates the listener on its first `update()`.
  - `resource_container`: [ResourceContainer](https://github.com/ohzinteractive/core/blob/main/src/ResourceContainer.ts) from `ohzi-core`. Sounds are read from it by name.
  - `time`: [Time](https://github.com/ohzinteractive/core/blob/main/src/Time.ts) from `ohzi-core`, used by the loop fades.

  Also binds window `blur`/`focus` and `visibilitychange` to `on_blur()` and `on_focus()`.

- `setup_sounds_names(sounds_data)`: Registers the names in `[{ name }]` as known sounds. `play()` queues a known sound that isn't initialized yet instead of warning.

- `init_sounds(sounds_data)`: For each `{ name }`, takes the `AudioClip` with that name from the resource container and calls its `init(listener)`. Loop clips get a fader. Then plays the sounds `play()` queued.

- `play(name)` / `play([names])`: Plays one sound or several.
  - One-shot clip: restarts it if it's already playing.
  - Loop clip: fades it in, and fades out every other loop clip not in the same call.
  - Not initialized but registered with `setup_sounds_names`: queued until the next `init_sounds()`. Otherwise it logs `Sound not found`.

- `pause(name)`: Pauses a playing sound and remembers it.

- `unpause_sounds()`: Plays every sound paused with `pause()`.

- `stop(name)`: Stops a sound right away, with no fade even for loop clips, and drops it from the paused list.

- `stop_all_sounds(except = [])`: Calls `stop()` on every initialized sound except the given names.

- `stop_all_loop_sounds(except = [])`: Fades out every loop sound except the given names.

- `mute(muted_by_user = true)`: Sets the master volume to 0. Does nothing if already muted.

- `unmute()`: Sets the master volume back to `max_volume`.

- `set_volume(normalized)`: Sets `max_volume`, clamped to 0–1. Applied right away unless muted.

- `on_blur()`: Mutes without marking it as a user mute. Called by the focus listeners.

- `on_focus()`: Unmutes, unless the user muted. Called by the focus listeners.

- `update()`: Should be called in an `update` method. Advances the loop fades. The first call creates the listener, muted. The second call unmutes it.

### Properties

- `listener`: The three.js `AudioListener`. `undefined` until the first `update()`.
- `sounds`: Initialized clips by name.
- `max_volume`: Master volume while unmuted. Default `0.9`.
- `muted`: Whether the master volume is 0. Starts as `true`.
- `muted_by_user`: Whether the last mute came from `mute()` rather than from losing focus.

## AudioUnlocker
- Browsers keep the `AudioContext` suspended until the user interacts with the page. AudioUnlocker resumes it on the first click or touch.
- Class. Create one with `new`.

### Methods

- `constructor(os, AudioContext)`: Starts listening to `click`, and also to `touchstart` when `os.is_mobile` or `os.is_ipad`.
  - `os`: [OS](https://github.com/ohzinteractive/core/blob/main/src/OS.ts) from `ohzi-core`.
  - `AudioContext`: The three.js `AudioContext` object (its static `getContext()` returns the context the listener uses).

- `unlock()`: Gesture handler. Resumes the context and plays a one-sample silent buffer. 100 ms later it removes the gesture listeners if the context is `running`. If it isn't, the next gesture tries again.

- `unlock_context()`: Resumes the context when it is `suspended` or `interrupted`. On failure it retries up to `max_retries` times, after 1, 2 and 4 seconds.

When the tab becomes visible again it calls `unlock_context()` after 500 ms, because Safari can suspend or interrupt the context while the tab is hidden. Window `focus` resets the retry count.

### Properties

- `is_unlocked`: `true` once a gesture left the context running.
- `max_retries`: Resume retries after a failure. Default `3`.

### Example

```typescript
import { OS, ResourceContainer, Time } from 'ohzi-core';
import { AudioManager, AudioUnlocker } from 'ohzi-components';
import { AudioContext, AudioListener } from 'three';

// Sound data, also given to the scene's asset loading
const sounds = [
  { name: 'background', url: '/sounds/background.mp4', loop: true, volume: 0.05 },
  { name: 'click', url: '/sounds/click.mp4', loop: false, volume: 1 }
];

// App init
AudioManager.init(AudioListener, ResourceContainer, Time);
const audio_unlocker = new AudioUnlocker(OS, AudioContext);

// Scene init: play() before the clips are ready queues them
AudioManager.setup_sounds_names(sounds);
AudioManager.play('background');

// Once the clips are loaded (e.g. on_high_quality_assets_ready)
AudioManager.init_sounds(sounds); // plays the queued 'background'

// In your update loop
AudioManager.update();

// Mute toggle
if (AudioManager.muted)
{
  AudioManager.unmute();
}
else
{
  AudioManager.mute();
}
```

### Notes

- Call `init_sounds()` only after the first `update()`. Before that `listener` is `undefined`, and three.js `Audio` throws when it gets no listener.
- `mute()` before the second `update()` has no effect. The manager starts muted, so `mute()` returns early, and the second `update()` unmutes.
- Whether a clip loops comes from the clip. ohzi-core's `AudioClip` defaults to `loop = true`, so pass `loop: false` for one-shot sounds.
- `stop()` cuts a loop sound without a fade, and its fader stays at full volume, so the next `play()` starts it at full volume. Use `stop_all_loop_sounds()` to fade it out.
- `init_sounds()` re-initializes clips it already knows. A clip that is playing keeps playing on its old three.js `Audio`, which nothing can stop anymore. Stop sounds before you initialize them again.
- Muting changes the master volume only. Sounds keep playing silently.
- Neither class removes its window or document listeners.

### Usage

The boilerplate ships this wiring commented out in `app/js/MainApplication.ts` (init, unlocker and update) and `app/js/scenes/HomeScene.ts` (`setup_sounds_names` and `init_sounds`). Sound data lives in `app/data/assets/<scene>/high/<scene>_high_sounds.js`.
