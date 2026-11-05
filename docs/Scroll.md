# OHZI Components

## Scroll
- Turns wheel, touch and drag input into a smoothed scroll value (`current`) that the app reads every frame.
- Three modes: free scrolling between bounds, free scrolling that snaps to steps, and one step at a time with an eased transition.
- Platform-aware: it picks the input source and the direction per device.
- Singleton. `import { Scroll } from 'ohzi-components'` gives you the instance, so don't call `new`.

### Methods

- `init(input, os, omath, time, easing_functions)`: Initialize component. Starts in free mode with no bounds, so pick a mode before the first `update()`.
  - `input`: The boilerplate's `Input` (`app/js/components/Input.ts`, a pit-js `InputController`).
  - `os`: [OS](https://github.com/ohzinteractive/core/blob/main/src/OS.ts) from `ohzi-core`.
  - `omath`: [OMath](https://github.com/ohzinteractive/core/blob/main/src/utilities/OMath.ts) from `ohzi-core`.
  - `time`: [Time](https://github.com/ohzinteractive/core/blob/main/src/Time.ts) from `ohzi-core`.
  - `easing_functions`: [EasingFunctions](https://github.com/ohzinteractive/core/blob/main/src/utilities/EasingFunctions.ts) from `ohzi-core`, used by the step transition.

- `enable()`: Enable scrolling interactions.

- `disable()`: Disable scrolling interactions. Free-by-steps mode ignores it (see Notes).

- `set_free_scrolling(from, to, reset = true)`: Set free scrolling mode with bounds.
  - `from`: Minimum scroll value
  - `to`: Maximum scroll value
  - `reset`: Whether to move `current` and `target` to `from`

- `set_free_scrolling_by_steps(steps, reset = true)`: Set free scrolling that snaps to steps.
  - `steps`: Scroll values to snap to, in ascending order
  - `reset`: Whether to move to the first step

- `set_step_scrolling(steps, reset = true)`: Set one-step-at-a-time scrolling. Also sets the step index to 0.
  - `steps`: Scroll values of each step
  - `reset`: Whether to move to the first step

- `scroll_forward()`: Move forward.
  - Free mode: `target += 1`.
  - Step mode: moves to the next step. It doesn't check bounds (see Notes).
  - Free-by-steps mode and during a step transition: does nothing.

- `scroll_backward()`: The same as `scroll_forward()`, backwards.

- `scroll_to(target)`: Sets `target`. Only works in free mode. Free-by-steps mode logs `implement`, and step mode does nothing.

- `reset(target = 0)`: Sets `current` and `target` to `target` and `duration` to 1. Doesn't change the step index.

- `get_progress()`: Progress from 0 to 1.
  - Free mode: where `current` sits between `from` and `to`.
  - Step modes: `(|current| − |first step|) / (|last step| − |first step|)`.
  - During a step transition: 0.

- `get_current_step()`: The current step value. Step mode only. Returns 0 in other modes and during a step transition.

- `get_current_step_index()`: The current step index. Step mode only. Returns 0 in other modes and during a step transition.

- `update(delta_x = input.pointer_pos_delta.x, delta_y = input.pointer_pos_delta.y)`: Should be called in an `update` method. Computes `delta` and runs the current mode. Pass your own deltas to drive the touch and drag scroll from another source.

### Properties

- `current`: Current scroll position. Read this to drive the scene.
- `target`: Target scroll position. Free mode eases `current` toward it.
- `delta`: This frame's scroll input, after platform adjustments.
- `duration`: Step mode: seconds per step transition. Free mode: smoothing time, where higher is slower, reset to 1 by any input. `reset()` also sets it to 1.
- `enabled`: Whether scrolling is enabled.
- `is_scrolling`: Getter. `true` while `current` is more than 0.01 away from `target`. Only reliable in free mode.
- `states`: The mode objects: `free`, `free_by_steps`, `by_steps` and `by_steps_scrolling`.
- `current_state`: The active mode object.

### States

The Scroll component uses a state pattern with four different scrolling behaviors:

- **FreeScrollState** (`states.free`): Continuous scrolling with bounds. Input moves `target` by `delta × sensitivity` (default `0.2`, change it with `states.free.set_sensitivity()`), clamped to `from`–`to`. `current` eases toward `target` with a framerate-independent decay.
- **FreeByStepsScrollState** (`states.free_by_steps`): Free scrolling that snaps to defined steps. Input adds velocity (`speed`: 5 on Mac, 3 on mobile, 1 elsewhere), which loses 10% every frame. When the velocity is almost 0, `current` is pulled toward the next step in the direction it was moving (`snap_speed`: 4). Clamped to the first and last step.
- **ByStepsScrollState** (`states.by_steps`): Discrete step-based scrolling. A `delta` above a per-device sensitivity (0.3 mobile, 0.5 iPad, 0.1 Mac, 0 elsewhere) moves one step and starts the transition.
- **ByStepsScrollingScrollState** (`states.by_steps_scrolling`): Smooth transition state between steps. Eases `current` to the new step over `duration` seconds with `ease_in_out_cubic`, ignoring input, then goes back to `by_steps`.

### Example

```typescript
import { EasingFunctions, OMath, OS, Time } from 'ohzi-core';
import { Scroll } from 'ohzi-components';
import { Input } from './components/Input';

Scroll.init(Input, OS, OMath, Time, EasingFunctions);

// Free scrolling with bounds
Scroll.set_free_scrolling(0, 100);
Scroll.scroll_to(50);

// Or step scrolling
const steps = [0, 10, 20, 30];
Scroll.set_step_scrolling(steps);
Scroll.duration = 0.8; // seconds per step, after set_step_scrolling()

// In your update loop
Scroll.update();
const progress = Scroll.get_progress();

// Next step, without going past the last one
if (Scroll.get_current_step_index() < steps.length - 1)
{
  Scroll.scroll_forward();
}
```

### Platform Considerations

- On `os.is_mobile`, the scroll comes from the touch drag, `(delta_x − delta_y) × 0.02`.
- Elsewhere it comes from the wheel (`input.scroll_delta`), and dragging with the left mouse button also scrolls.
- The direction is inverted on Mac, iPad and Android, and the delta is halved on Mac.

### Notes

- Pick a mode before the first `update()`. Free mode has no bounds until `set_free_scrolling()`, and clamping to undefined bounds turns `current` into `NaN`.
- In step mode, `scroll_forward()` and `scroll_backward()` don't check bounds. Past the last or first step, `current` becomes `NaN`. Check `get_current_step_index()` first.
- Free-by-steps mode ignores `enabled`, so `disable()` doesn't stop it. Free mode stops reading input but still eases `current` to `target`.
- `is_scrolling` compares `current` with `target`, but the step modes move `current` only. After the first step it stays `true`.
- `get_progress()` in the step modes uses absolute values, so it's only right when every step has the same sign.
- `default_cooldown` (1.4) and `current_cooldown` exist on Scroll, but the step mode checks its own cooldown, which stays 0. The only pause between steps is the transition, so a long trackpad swipe can move more than one step.
