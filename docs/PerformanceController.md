# OHZI Components

## Performance Controller
- Enable or disable optional features, and/or Increase or decrease [DevicePixelRatio](https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio) depending on current frames per second (FPS).

### **Rules**

On every frame:

| Condition | Action |
| --- | --- |
| `FR > 60` & `threshold disabled` | DPR will be **increased** to a max of 1.25 of the current DPR  |
| `30 < FR < 60` & `threshold disabled` | Enable threshold and **reduce** DPR |
| `FR < 30` & `opt_to_disable` | Next optional feature in the list gets **disabled** |
| `FR < 30` & `NO_opt_to_disable` | DPR **reduced** 0.25 |

> **FR** => framerate
>
> **DPR** => Device Pixel Ratio
>
> - `Framerate` is calculated from 5 samples 1 second long each.
> - `Threshold` enabled denotes that the framerate is inside the accepted range and should not be moved anymore.
> - A breathing window is set, checking for `performance_t > 2` on each frame. Giving the app 2 seconds to stabilize itself. This gets reset after a feature disable or DPR decrease/increase.

### Methods

- `init(...)`: Initialize component.

  > Expects:
  >
  > - [Omath](https://github.com/ohzinteractive/core/blob/main/src/utilities/OMath.js)
  >
  > - [Settings](https://github.com/ohzinteractive/core/blob/main/src/Settings.js)
  >
  > - [Graphics](https://github.com/ohzinteractive/core/blob/main/src/Graphics.js)
  >
  > - [Time](https://github.com/ohzinteractive/core/blob/main/src/Time.js)
  >
  > - [Oscreen](https://github.com/ohzinteractive/core/blob/main/src/OScreen.js)

- `on_focus_in()`: Starts performance check. (private)

- `on_focus_out()`: Stops performance check. (private)

- `add_optional_features([...])`: Add features that can be disabled if performance is too low. It receives an array of objects that have to implement the method `disable_optional_feature`.

- `update()`: Should be called in an `update` method.

### Usage
For a code example go to [this commit](https://github.com/ohzinteractive/boilerplate/commit/fada02566b065dd34cf5100b9d796afedcba8618).
