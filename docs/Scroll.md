# OHZI Components

## Scroll
- A comprehensive scrolling component with multiple scroll modes and state management.
- Supports different scrolling behaviors including free scrolling, step-based scrolling, and smooth transitions between states.
- Platform-aware with optimized behavior for mobile, desktop, and different operating systems.

### Methods

- `init(input, os, omath, time, easing_functions)`: Initialize component.
  - `input`: Input object from Boilerplate
  - `os`: OS detection object
  - `omath`: Math utilities object
  - `time`: Time management object  
  - `easing_functions`: Easing functions for smooth transitions

- `enable()`: Enable scrolling interactions.

- `disable()`: Disable scrolling interactions.

- `set_free_scrolling(from, to, reset = true)`: Set free scrolling mode with bounds.
  - `from`: Minimum scroll value
  - `to`: Maximum scroll value
  - `reset`: Whether to reset to the starting position

- `set_free_scrolling_by_steps(steps, reset = true)`: Set free scrolling with snap-to-step behavior.
  - `steps`: Array of scroll positions to snap to
  - `reset`: Whether to reset to the first step

- `set_step_scrolling(steps, reset = true)`: Set discrete step-based scrolling mode.
  - `steps`: Array of scroll positions
  - `reset`: Whether to reset to the first step

- `scroll_forward()`: Move to the next step or scroll forward.

- `scroll_backward()`: Move to the previous step or scroll backward.

- `scroll_to(target)`: Scroll to a specific target position.

- `reset(target = 0)`: Reset scroll position to target value.

- `get_progress()`: Get current scroll progress as a normalized value (0-1).

- `get_current_step()`: Get the current step value.

- `get_current_step_index()`: Get the current step index.

- `update(delta_x, delta_y)`: Should be called in an `update` method.

### Properties

- `current`: Current scroll position.
- `target`: Target scroll position.
- `delta`: Current frame scroll delta.
- `duration`: Animation duration for transitions.
- `enabled`: Whether scrolling is enabled.
- `is_scrolling`: Boolean indicating if currently scrolling.

### States

The Scroll component uses a state pattern with four different scrolling behaviors:

- **FreeScrollState**: Continuous scrolling with bounds
- **FreeByStepsScrollState**: Free scrolling that snaps to defined steps
- **ByStepsScrollState**: Discrete step-based scrolling with cooldown
- **ByStepsScrollingScrollState**: Smooth transition state between steps

### Example

```javascript
import { Scroll } from './scroll/Scroll.js';

// Initialize the scroll component
const scroll = new Scroll();
scroll.init(input, os, omath, time, easing_functions);

// Set up free scrolling with bounds
scroll.set_free_scrolling(-1000, 1000);

// Or use step-based scrolling
const steps = [0, 500, 1000, 1500];
scroll.set_step_scrolling(steps);

// In your update loop
function update() {
  scroll.update();
  
  // Get current scroll progress
  const progress = scroll.get_progress();
  
  // Check if scrolling
  if (scroll.is_scrolling) {
    // Handle scrolling state
  }
}

// Control scrolling programmatically
scroll.scroll_forward();
scroll.scroll_backward();
scroll.scroll_to(750);
```

### Platform Considerations

- Automatically adjusts sensitivity and behavior based on device type (mobile, tablet, desktop)
- Platform-specific optimizations for Mac, Android, and iOS
- Touch-friendly on mobile devices with appropriate delta scaling