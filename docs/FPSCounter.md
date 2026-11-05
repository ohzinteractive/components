# OHZI Components

## FPSCounter
- Counts frames per second from the running app, and keeps the last 5 one-second samples.
- Singleton. `import { FPSCounter } from 'ohzi-components'` gives you the instance, so don't call `new`.
- [PerformanceController](PerformanceController.md) reads it to adjust the DPR.

### Methods

- `init(time)`: Initialize component.
  - `time`: [Time](https://github.com/ohzinteractive/core/blob/main/src/Time.ts) from `ohzi-core`. Seconds are counted on `time.elapsed_time`.

- `update()`: Should be called in an `update` method, once per frame.

- `reset()`: Sets `fps` and every sample back to 60.

### Properties

- `fps`: Frames counted during the last full second.
- `avg`: Getter. Average of the last 5 samples.
- `fps_samples`: The last 5 one-second counts, oldest first. Starts as `[60, 60, 60, 60, 60]`.

### Example

```typescript
import { Time } from 'ohzi-core';
import { FPSCounter } from 'ohzi-components';

FPSCounter.init(Time);

// In your update loop
FPSCounter.update();
fps_label.textContent = `${FPSCounter.fps} fps (avg ${Math.round(FPSCounter.avg)})`;
```

### Notes

- Don't call `update()` yourself when a PerformanceController is running. Its `update()` already calls it, and a second call doubles the count.
- The samples start at 60, so `avg` takes about 5 seconds to reflect the real framerate.
