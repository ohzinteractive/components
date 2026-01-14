
class UICollisionLayer
{
  constructor()
  {
  }

  init(main_input, time)
  {
    this.main_input = main_input;
    this.time = time;

    this.elements = new Set();

    this.mouse_out_cooldown = 0.2;
    this.main_input.over_ui = false;

    this.mutation_observer = new MutationObserver(this.on_element_mutated.bind(this));
    this.mutation_observer_config = { attributes: true, childList: false, subtree: false };

    this.resize_observer = new ResizeObserver(this.on_element_resized.bind(this));
  }

  add_element(elem)
  {
    this.elements.add(elem);

    this.mutation_observer.observe(elem, this.mutation_observer_config);
    this.resize_observer.observe(elem);

    elem.rect = elem.getBoundingClientRect();
  }

  remove_element(elem)
  {
    this.mutation_observer.disconnect();

    this.elements.delete(elem);

    for (const element of this.elements)
    {
      this.mutation_observer.observe(element, this.mutation_observer_config);
    }
  }

  update()
  {
    // this.main_input.over_ui = !this.is_mouse_over();
    this.mouse_out_cooldown -= this.time.delta_time;
    this.mouse_out_cooldown = Math.max(this.mouse_out_cooldown, 0);

    if (this.is_mouse_over())
    {
      this.mouse_out_cooldown = 0.2;
    }

    this.main_input.over_ui = this.mouse_out_cooldown > 0;
  }

  on_element_mutated(mutationList, observer)
  {
    for (const mutation of mutationList)
    {
      if (mutation.type === 'attributes')
      {
        if (mutation.attributeName === 'style' || mutation.attributeName === 'class')
        {
          const element = mutation.target;
          const rect = element.getBoundingClientRect();

          element.rect = rect;
        }
      }
    }
  }

  on_element_resized(entries)
  {
    for (const entry of entries)
    {
      const element = entry.target;
      const rect = element.getBoundingClientRect();

      element.rect = rect;
    }
  }

  is_mouse_over()
  {
    for (const element of this.elements)
    {
      if (this.pointer_is_over_element(element))
      {
        return true;
      }
    }

    return false;
  }

  pointer_is_over_element(elem)
  {
    const rect = elem.rect;
    const pos = this.main_input.pointer_pos;

    return  pos.x > rect.left &&
            pos.x < rect.left + rect.width &&
            pos.y > rect.top &&
            pos.y < rect.top + rect.height;
  }
}

const ui_collision_layer = new UICollisionLayer();
export { ui_collision_layer as UICollisionLayer };
