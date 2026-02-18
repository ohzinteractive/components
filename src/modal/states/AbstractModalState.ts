import type { AbstractModalComponent } from "../AbstractModalComponent";

class AbstractModalState
{
  name: string;
  
  constructor(name: string)
  {
    this.name = name;
  }

  on_enter(modal_component: AbstractModalComponent)
  {
  }

  on_exit(modal_component: AbstractModalComponent)
  {
  }

  update(modal_component: AbstractModalComponent)
  {

  }
}

export { AbstractModalState };
