
class UICollisionLayer
{
  constructor()
  {
  }

  init(input, time)
  {
    this.input = input;
    this.time = time;

    this.elements = new Set();

    this.mouse_out_cooldown = 0.2;
    this.input.over_ui = false;
  }

  add_element(elem)
  {
    this.elements.add(elem);
  }

  remove_element(elem)
  {
    this.elements.delete(elem);
  }

  update()
  {
    // Input.over_ui = !this.is_mouse_over();
    this.mouse_out_cooldown -= this.time.delta_time;

    if (this.is_mouse_over())
    {
      this.mouse_out_cooldown = 0.2;
    }

    this.input.over_ui = this.mouse_out_cooldown > 0;
  }

  is_mouse_over()
  {
    for (const element of this.elements)
    {
      if (this.input.pointer_is_over_element(element))
      {
        return true;
      }
    }

    return false;
  }
}

export default new UICollisionLayer();
