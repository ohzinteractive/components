import { AbstractModalState } from './states/AbstractModalState';

class AbstractModalComponent
{
  constructor()
  {
  }

  init(ui_collision_layer, html_utilities, time)
  {
    this.name = 'modal';
    this.container = document.querySelector('.modal');
    this.hidden = true;

    this.ui_collision_layer = ui_collision_layer;
    this.html_utilities = html_utilities;
    this.time = time;

    this.states = {};

    this.last_state = undefined;
    this.current_state = new AbstractModalState('abstract');

    this.next_state_name = undefined;
    this.next_state_t = 0;
  }

  start()
  {

  }

  on_enter()
  {
    this.container.classList.remove('hidden');
    this.hidden = false;

    this.load_html_images();
  }

  on_exit()
  {
    this.container.classList.add('hidden');
    this.hidden = true;
  }

  update(current_state_data)
  {
    if (!this.hidden)
    {
      this.current_state.update(this);
    }
    else
    {
      if (this.next_state_name)
      {
        this.next_state_t += this.time.delta_time;

        if (this.next_state_t > 0.25)
        {
          this.next_state_t = 0;
          this.show_state(this.next_state_name);
          this.next_state_name = undefined;
        }
      }
    }
  }

  show_state(state_name)
  {
    if (this.hidden)
    {
      this.ui_collision_layer.add_element(this.container);

      this.set_state(this.states[state_name]);
      this.on_enter();
    }
    else
    {
      this.hide(state_name);
    }
  }

  hide(next_state_name)
  {
    this.ui_collision_layer.remove_element(this.container);

    this.on_exit();

    this.last_state = undefined;
    this.next_state_name = next_state_name;
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

  load_html_images()
  {
    this.html_utilities.load_images(this.container);
  }

  load_html_videos()
  {
    this.html_utilities.load_videos(this.container);
  }
}

export { AbstractModalComponent };
