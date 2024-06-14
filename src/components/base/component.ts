export abstract class Component<T> {
  protected constructor(protected readonly container: HTMLElement) {
  }

  //переключает класс
  toggleClass(element: HTMLElement, className: string, force?: boolean) {
    element.classList.toggle(className, force);
  }

  //устанавливает текст
  setText(element: HTMLElement, value: string) {
    if (element) {
      element.textContent = String(value);
    }
  }

  //меняет статус блокировки
  setDisabled(element: HTMLElement, state: boolean) {
    if (element) {
      if (state) { 
          element.setAttribute('disabled', 'disabled');
      }
        else {
          element.removeAttribute('disabled');
        }
    }
  }

  //скрывает
  protected setHidden(element: HTMLElement) {
    element.style.display = 'none';
  }

  //показывает
  protected setVisible(element: HTMLElement) {
    element.style.removeProperty('display');
  }

  //устанавливает изображение
  protected setImage(element: HTMLImageElement, src: string, alt?: string) {
    if (element) {
      element.src = src;
        if (alt) {
          element.alt = alt;
        }
    }
  }

  //возвращает корневой DOM-элемент
  render(data?: Partial<T>): HTMLElement {
    Object.assign(this as object, data ?? {});
      return this.container;
  }
}