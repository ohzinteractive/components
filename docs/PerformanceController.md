# OHZI Components

## Performance Controller
- Disables optional features, and raises or lowers the [DevicePixelRatio](https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio), depending on the current frames per second (FPS).
- Class. Create one with `new`.

### **Rules**

On every frame, once the breathing window has passed:

| Condition | Action |
| --- | --- |
| `FR < 30` & `opt_to_disable` | Next optional feature in the list gets **disabled** |
| `FR < 30` & `NO_opt_to_disable` | DPR **reduced** by 0.25, to a min of 0.75 |
| `30 ≤ FR < 60` & `threshold disabled` & `DPR > 1` | DPR **reduced** by 0.25 and threshold **enabled** |
| `FR ≥ 60` & `threshold disabled` | DPR **increased** by 0.25, to a max of 1.25 × `window.devicePixelRatio` (min 1) |

> **FR** => framerate, `FPSCounter.avg`
>
> **DPR** => Device Pixel Ratio, `settings.dpr`
>
> - `Framerate` is the average of 5 samples, each 1 second long.
> - `Threshold` enabled means the framerate is in the accepted range. It stops DPR increases and the `30 ≤ FR < 60` reduction, but `FR < 30` still acts. Once enabled it stays enabled.
> - A breathing window is set, checking for `performance_t > 2` on each frame. This gives the app 2 seconds to stabilize. It restarts after every action and when the window regains focus.
> - The two `FR < 30` actions also reset the FPS samples to 60.

### Methods

- `init(omath, settings, graphics, time, oscreen, fps_counter)`: Initialize component.
  - `omath`: [OMath](https://github.com/ohzinteractive/core/blob/main/src/utilities/OMath.ts) from `ohzi-core`.
  - `settings`: An object with a numeric `dpr` that the controller reads and writes. In the boilerplate, `Settings` from `app/js/Settings.ts`.
  - `graphics`: [Graphics](https://github.com/ohzinteractive/core/blob/main/src/Graphics.ts) from `ohzi-core`. Each DPR change calls `graphics.on_resize()` with the new DPR and the current `OScreen` position and size.
  - `time`: [Time](https://github.com/ohzinteractive/core/blob/main/src/Time.ts) from `ohzi-core`.
  - `oscreen`: [OScreen](https://github.com/ohzinteractive/core/blob/main/src/OScreen.ts) from `ohzi-core`.
  - `fps_counter`: The [FPSCounter](FPSCounter.md) singleton. Call `FPSCounter.init(Time)` first.

  Also binds window `focus` and `blur`.

- `on_focus_in()`: Starts performance check. Bound to window `focus`. (private)

- `on_focus_out()`: Stops performance check, including FPS counting. Bound to window `blur`. (private)

- `add_optional_features([...])`: Add features that can be disabled if performance is too low. It receives an array of objects that have to implement the method `disable_optional_feature()`. They are disabled one at a time, in array order, and never re-enabled.

- `update()`: Should be called in an `update` method. Also calls `fps_counter.update()`, so don't call that yourself.

### Properties

- `threshold`: Whether the threshold is enabled.
- `optional_features`: Features added with `add_optional_features()`.
- `performance_t`: Seconds since the last action.

### Example

```typescript
import { Graphics, OMath, OScreen, Time } from 'ohzi-core';
import { FPSCounter, PerformanceController } from 'ohzi-components';
import { Settings } from './Settings';

FPSCounter.init(Time);

const performance_controller = new PerformanceController();
performance_controller.init(OMath, Settings, Graphics, Time, OScreen, FPSCounter);

performance_controller.add_optional_features([
  { disable_optional_feature: () => bloom.disable() },
  { disable_optional_feature: () => particles.hide() }
]);

// In your update loop
performance_controller.update();
```

### Notes

- In the current `ohzi-core`, `Graphics.on_resize()` sets `OScreen.dpr` but doesn't call `setPixelRatio()`, and three.js `setSize()` sizes the canvas with the pixel ratio set at `Graphics.init()`. So DPR changes don't change the canvas resolution yet.
