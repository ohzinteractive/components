import type { Input } from "../lib/Input";
import type { Time } from "../lib/Time";
import type { UIElement } from "./UIElement";

class UICollisionLayer
{
  elements: Set<UIElement>;
  input: Input;
  mouse_out_cooldown: number;
  mutation_observer: MutationObserver;
  mutation_observer_config: MutationObserverInit;
  resize_observer: ResizeObserver;
  time: Time;
  
  constructor()
  {
  }

  init(input: Input, time: Time)
  {
    this.input = input;
    this.time = time;

    this.elements = new Set();

    this.mouse_out_cooldown = 0.2;
    this.input.over_ui = false;

    this.mutation_observer = new MutationObserver(this.on_element_mutated.bind(this));
    this.mutation_observer_config = { attributes: true, childList: false, subtree: false };

    this.resize_observer = new ResizeObserver(this.on_element_resized.bind(this));
  }

  add_element(elem: UIElement)
  {
    this.elements.add(elem);

    this.mutation_observer.observe(elem, this.mutation_observer_config);
    this.resize_observer.observe(elem);

    elem.rect = elem.getBoundingClientRect();
  }

  remove_element(elem: UIElement)
  {
    this.mutation_observer.disconnect();

    this.elements.delete(elem);

    for (const element of this.elements)
    {
      this.mutation_observer.observe(element as Node, this.mutation_observer_config);
    }
  }

  update()
  {
    // this.input.over_ui = !this.is_mouse_over();
    this.mouse_out_cooldown -= this.time.delta_time;
    this.mouse_out_cooldown = Math.max(this.mouse_out_cooldown, 0);

    if (this.is_mouse_over())
    {
      this.mouse_out_cooldown = 0.2;
    }

    this.input.over_ui = this.mouse_out_cooldown > 0;
  }

  on_element_mutated(mutationList: MutationRecord[], observer: MutationObserver)
  {
    for (const mutation of mutationList)
    {
      if (mutation.type === 'attributes')
      {
        if (mutation.attributeName === 'style' || mutation.attributeName === 'class')
        {
          const element = mutation.target as UIElement;
          const rect = element.getBoundingClientRect();

          element.rect = rect;
        }
      }
    }
  }

  on_element_resized(entries: ResizeObserverEntry[])
  {
    for (const entry of entries)
    {
      const element = entry.target as UIElement;
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

  pointer_is_over_element(elem: UIElement)
  {
    const rect = elem.rect;
    const pos = this.input.pointer_pos;

    return  pos.x > rect.left &&
            pos.x < rect.left + rect.width &&
            pos.y > rect.top &&
            pos.y < rect.top + rect.height;
  }
}

const ui_collision_layer = new UICollisionLayer();
export { ui_collision_layer as UICollisionLayer };
