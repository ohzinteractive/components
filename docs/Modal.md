# OHZI Components

## Modal
- A single overlay (`.modal`) that shows one of several states at a time. Each state is a panel (`.modal__container.<name>`).
- Opening a state while another is open closes the modal and opens the new state 0.25 s later.
- Can register the overlay with [UICollisionLayer](UICollisionLayer.md) so `input.over_ui` is `true` while the pointer is over it.
- Two exports:
  - `AbstractModalComponent` is the base class of the app's modal component.
  - `ModalState` is the base class of each state.
- To scaffold a new state, its template and its styles, run `yarn create-modal my_modal` in the boilerplate. See [Creating Modals](https://github.com/ohzinteractive/boilerplate/blob/main/docs/creating-modals.md).

## AbstractModalComponent
- Class. Extend it and export one instance, as the boilerplate's `ModalComponent` does.

### Methods

- `init(ui_collision_layer, time)`: Initialize component.
  - `ui_collision_layer`: The [UICollisionLayer](UICollisionLayer.md) singleton.
  - `time`: [Time](https://github.com/ohzinteractive/core/blob/main/src/Time.ts) from `ohzi-core`.

  Reads `.modal` into `container` and `.modal__animation` into `animation`, starts hidden, and resets `states` to `{}`. Register states after `init()`.

- `start()`: Empty hook. The boilerplate registers its states here.

- `show_state(state_name, collision = true)`: Opens the state registered under `state_name`.
  - Hidden: adds `container` to the UICollisionLayer when `collision` is `true`, switches to the state, then calls `on_enter()`.
  - Open: calls `hide(state_name, collision)`. `update()` opens the state 0.25 s later.

- `hide(next_state_name?, next_state_collision = true)`: Removes `container` from the UICollisionLayer, calls `on_exit()` and clears `last_state`. If `next_state_name` is given, `update()` opens it 0.25 s later.

- `set_state(state)`: Switches to a state object without closing the modal. Calls `on_exit` on the current state and `on_enter` on the new one. If the modal is open, it saves the current state in `last_state`.

- `restore_last_state()`: Re-opens `last_state` by its `name` (close, then open 0.25 s later). Hides the modal if there is no `last_state`.

- `on_enter()`: Removes the `hidden` class from `container`.

- `on_exit()`: Adds the `hidden` class to `container`.

- `update(current_state_data)`: Should be called in an `update` method. Calls `update()` on the current state, and opens the state queued by `hide()`. The argument is unused.

### Properties

- `states`: Registered states by key. `show_state()` looks states up here.
- `current_state`: The active state. An empty `AbstractModalState` until the first `show_state()`.
- `last_state`: The state to go back to with `restore_last_state()`. See Notes.
- `hidden`: Whether the overlay is hidden. Starts as `true`.
- `container`: The `.modal` element.
- `animation`: The `.modal__animation` element. The base class doesn't use it.

## ModalState
- Base class of a modal state. Extend it and call `super` in each hook.

### Methods

- `constructor(name)`: Stores `name` and reads `.modal__container.<name>` into `container`.
- `on_enter(modal_component)`: Removes the `hidden` class from `container`.
- `on_exit(modal_component)`: Adds the `hidden` class to `container`.
- `update(modal_component)`: Empty. Called every frame from the component's `update()`.

### Properties

- `name`: The state's CSS class, used to find its `container`.
- `container`: The `.modal__container.<name>` element.

### Example

```typescript
import { AbstractModalComponent, ModalState } from 'ohzi-components';

class PrivacyPolicyModalState extends ModalState
{
  on_enter(modal_component: AbstractModalComponent)
  {
    super.on_enter(modal_component);
    // Bind buttons, start animations
  }
}

class ModalComponent extends AbstractModalComponent
{
  start()
  {
    super.start();

    this.states = {
      // key used by show_state()   CSS class of the panel
      privacy_policy: new PrivacyPolicyModalState('privacy-policy-modal')
    };
  }
}

const modal_component = new ModalComponent();
export { modal_component as ModalComponent };
```

```typescript
// App init
ModalComponent.init(UICollisionLayer, Time);
ModalComponent.start();

// In your update loop
ModalComponent.update();

// Open, then close
ModalComponent.show_state('privacy_policy');
ModalComponent.hide();
```

### Notes

- A state has two names: the key in `states`, used by `show_state()`, and its `name`, the CSS class. `yarn create-modal privacy_policy` registers `privacy_policy: new PrivacyPolicyModalState('privacy-policy-modal')`.
- `restore_last_state()` re-opens the state by its `name`, not its key. It only works when both are the same string.
- `last_state` is only saved by `set_state()` while the modal is open. `show_state()` never saves it. For a nested modal, switch with `set_state(this.states[key])` and go back with `restore_last_state()`.
- `hide()` doesn't call the state's `on_exit()`. The state exits on the next `set_state()`, and its `update()` keeps running while the modal is hidden.
- Opening a state while the modal is open needs `update()` every frame. Without it the queued state never opens.
- `show_state()` with a key that isn't in `states` throws.
- `collision` doesn't block clicks. It only makes `input.over_ui` `true` over the overlay, so your 3D input code can ignore the pointer there.
- The app needs CSS that hides `.modal.hidden` and `.modal__container.hidden`. The boilerplate has it in `app/css/components/modal/_modal.scss`.
