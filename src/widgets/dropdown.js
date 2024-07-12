class DropdownMenu {
  constructor(dropdownContainer) {
    const items = dropdownContainer.querySelectorAll('.dropdown-item');

    let offset = 0;
    const offsetStep = 52;
    for (const item of items) {
      offset += offsetStep;
      item.style.top = `${offset}px`;
    }

    const controller = dropdownContainer.querySelector('.dropdown-controller');
    controller.addEventListener('click', () => {
      if (dropdownContainer.classList.contains('dropdown-active')) {
        this.hide();
        return;
      }
      this.show();
    });

    const controllerRect = controller.getBoundingClientRect();

    document.body.addEventListener('click', (e) => {
      if (e.target === controller) {
        return;
      }

      if (
        e.clientX > controllerRect.left &&
        e.clientX < controllerRect.right &&
        e.clientY > controllerRect.bottom &&
        e.clientY < controllerRect.bottom + offset
      ) {
        // Within bounds
        return;
      } else {
        this.hide();
      }
    });

    this.el = dropdownContainer;
  }

  show() {
    this.el.classList.add('dropdown-active');
  }

  hide() {
    this.el.classList.remove('dropdown-active');
  }
}

export default DropdownMenu;
