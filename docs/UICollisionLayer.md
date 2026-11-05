# OHZI Components

## UI Collision Layer
- Tracks whether the pointer is over registered DOM elements (UI on top of the canvas) and writes the result to `input.over_ui`. 3D input code checks `over_ui` to ignore the pointer while it's over the UI.
- If an element is added, the function `is_mouse_over` will return `true` when the cursor is over that specific element.
- Singleton. `import { UICollisionLayer } from 'ohzi-components'` gives you the instance, so don't call `new`.
- [Modal](Modal.md) adds its overlay here when a state is shown with `collision = true`.

### Relevant Properties

- `elements`: An instance of [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set). Will hold all the elements the user finds relevant to check for cursor collision. Ensures the same element is not added twice.

- `mouse_out_cooldown`: Seconds `input.over_ui` stays `true` after the pointer leaves the elements. It counts down on every `update()` and goes back to 0.2 while the pointer is over an element. It starts at 0.2, so `over_ui` is `true` for the first 0.2 s.

### Methods

- `init(input, time)`: Initialize component. Sets `input.over_ui` to `false`.
  - `input`: The boilerplate's `Input` (`app/js/components/Input.ts`, a pit-js `InputController` with an `over_ui` field).
  - `time`: [Time](https://github.com/ohzinteractive/core/blob/main/src/Time.ts) from `ohzi-core`.

- `add_element(elem)`: Adds an element to the elements Set that will be looped on `is_mouse_over` function. Caches its bounding rect in `elem.rect`, and refreshes it when the element's `style` or `class` attribute or its size changes.

- `remove_element(elem)`: Removes an element from the elements Set.

- `update()`: Should be called in an `update` method. Sets `input.over_ui`.

  > Takes cool-down into account.

- `is_mouse_over()`: Loops over all the elements added to the elements Set and returns true if the cursor is over any of them, false if not. Compares `input.pointer_pos` with each cached rect.

- `pointer_is_over_element(elem)`: Whether the pointer is inside one element's cached rect.

### Example

```typescript
import { Time } from 'ohzi-core';
import { UICollisionLayer } from 'ohzi-components';
import { Input } from './components/Input';

UICollisionLayer.init(Input, Time);
UICollisionLayer.add_element(document.querySelector('.header'));

// In your update loop
UICollisionLayer.update();

if (!Input.over_ui && Input.left_mouse_button_pressed)
{
  // The click was on the 3D scene, not on the UI
}
```

### Notes

- The cached rect isn't refreshed when the element moves without its own size, `style` or `class` changing, for example on page scroll or when a parent moves. Call `add_element()` again to refresh it.
