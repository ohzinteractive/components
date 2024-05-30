import { AbstractModalState } from './states/AbstractModalState';

class AbstractModalComponent
{
  constructor()
  {
  }

  init(ui_collision_layer, time)
  {
    this.name = 'modal';
    this.container = document.querySelector('.modal');
    this.animation = document.querySelector('.modal__animation');
    this.hidden = true;

    this.ui_collision_layer = ui_collision_layer;
    this.time = time;

    this.states = {};

    this.last_state = undefined;
    this.current_state = new AbstractModalState('abstract');

    this.next_state_name = undefined;
    this.next_state_collision = true;
    this.next_state_t = 0;
  }

  start()
  {

  }

  on_enter()
  {
    this.container.classList.remove('hidden');
    // this.animation.classList.remove('hidden');
    this.hidden = false;
  }

  on_exit()
  {
    this.container.classList.add('hidden');
    // this.animation.classList.add('hidden');
    this.hidden = true;
  }

  update(current_state_data)
  {
    this.current_state.update(this);

    if (this.hidden)
    {
      if (this.next_state_name)
      {
        this.next_state_t += this.time.delta_time;

        if (this.next_state_t > 0.25)
        {
          this.next_state_t = 0;
          this.show_state(this.next_state_name, this.next_state_collision);
          this.next_state_name = undefined;
        }
      }
    }
  }

  show_state(state_name, collision = true)
  {
    if (this.hidden)
    {
      if (collision)
      {
        this.ui_collision_layer.add_element(this.container);
      }

      this.set_state(this.states[state_name]);
      this.on_enter();
    }
    else
    {
      this.hide(state_name, collision);
    }
  }

  hide(next_state_name, next_state_collision = true)
  {
    this.ui_collision_layer.remove_element(this.container);

    this.on_exit();

    this.last_state = undefined;
    this.next_state_name = next_state_name;
    this.next_state_collision = next_state_collision;
  }

  // Used on a close button when a nested modal is opened
  restore_last_state()
  {
    if (this.last_state)
    {
      this.show_state(this.last_state.current_state_name);
    }
    else
    {
      this.hide();
    }
  }

  set_state(state)
  {
    if (!this.hidden)
    {
      this.last_state = this.current_state;
    }

    this.current_state.on_exit(this);
    this.current_state = state;
    this.current_state.on_enter(this);
  }
}

export { AbstractModalComponent };
