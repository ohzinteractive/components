import { AbstractModalState } from './AbstractModalState';

class ModalState extends AbstractModalState
{
  container: any;
  
  constructor(name: any)
  {
    super(name);

    this.container = document.querySelector(`.modal__container.${this.name}`);
  }

  on_enter()
  {
    this.container.classList.remove('hidden');
  }

  on_exit()
  {
    this.container.classList.add('hidden');
  }

  update()
  {

  }
}

export { ModalState };
