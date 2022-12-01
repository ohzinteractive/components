# OHZI Components

## UI Collision Layer
- Creates a layer to handle cursor collision with specific elements added to a Set of elements.
- If an element is added, the function `is_mouse_over` will return `true` when the cursor is over that specific element.

### Relevant Properties

- `elements`: An instance of [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set). Will hold all the elements the user finds relevant to check for cursor collision. Ensures the same element is not added twice.

- `mouse_out_cooldown`: The amount of cool-down time between updates to the state of the mouse.

### Methods

- `init(input, time)`: Initialize component.

  Expects [Input](https://github.com/ohzinteractive/core/blob/main/src/Input.js) and [Time](https://github.com/ohzinteractive/core/blob/main/src/Time.js) elements from `ohzi-core`

- `add_element(elem)`: Adds an element to the elements Set that will be looped on `is_mouse_over` function.

- `remove_element(elem)`: Removes an element from the elements Set.

- `update()`: Should be called in an `update` method.

  > Takes cool-down into account.

- `is_mouse_over()`: Loops over all the elements added to the elements Set and returns true if the cursor is over said element and false if not.