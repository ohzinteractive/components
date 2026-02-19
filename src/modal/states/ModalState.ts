import type { AbstractModalComponent } from '../AbstractModalComponent';
import { AbstractModalState } from './AbstractModalState';

class ModalState extends AbstractModalState
{
  container: HTMLElement;
  
  constructor(name: string)
  {
    super(name);

    this.container = document.querySelector(`.modal__container.${this.name}`);
  }

  on_enter(modal_component: AbstractModalComponent)
  {
    this.container.classList.remove('hidden');
  }

  on_exit(modal_component: AbstractModalComponent)
  {
    this.container.classList.add('hidden');
  }

  update(modal_component: AbstractModalComponent)
  {

  }
}

export { ModalState };
