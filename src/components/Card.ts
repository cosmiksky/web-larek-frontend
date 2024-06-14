import { Component } from "./base/component";
import { ICard } from "../types";
import { ensureElement } from "../utils/utils";

interface ICardAction {
    onClick: (event: MouseEvent) => void;
}


export class Card extends Component<ICard> {
    protected _image: HTMLImageElement;
    protected _title: HTMLElement;
    protected _description: HTMLElement;
    protected _category: HTMLElement
    protected _price: HTMLElement
    btn?: HTMLButtonElement;

    Category: { [key: string]: string } = {'софт-скил': 'card__category_soft',
      другое: 'card__category_other','хард-скил': 'card__category_hard',
	  дополнительное: 'card__category_additional',
	  кнопка: 'card__category_button',
	};

    

    constructor(protected blockName: string, container: HTMLElement, actions?: ICardAction) {
        super(container)
        this._image = ensureElement<HTMLImageElement>(`.${blockName}__image`, container);
        this._title = ensureElement<HTMLElement>(`.${blockName}__title`, container);
        this._description = container.querySelector(`.${blockName}__text`);
        this._category = container.querySelector(`.${blockName}__category`);
        this._price = container.querySelector(`.${blockName}__price`);
        this.btn = container.querySelector(`.${blockName}__button`)

        if (actions?.onClick) {
          if (this.btn) {
            this.btn.addEventListener('click', actions.onClick);
          } else {
            container.addEventListener('click', actions.onClick);
          }
        }
    }

    set id(value: string) {
		this.container.dataset.id = value;
	}

    get id(): string {
        return this.container.dataset.id 
    }

    set title(value: string) {
        this.setText(this._title, value)
    }

    get title(): string {
        return this._title.textContent
    }

    set image(value: string) {
        this.setImage(this._image, value, this.title)
    }

    set category(value: string) {
        if(this.Category) {
            this._category.classList.add(this.Category[value])
        }
        this.setText(this._category, value)
    }

    get category(): string {
        return this._category.textContent || ''
    }

    set price(value: number | null) {
        this.setText(this._price, value ? `${value.toString()} синапсов` : `Бесценно`)
    }

    set description(value: string) {
        this.setText(this._description, value)
    }

    set button(value: string) {
        this.setText(this.btn, value)
    }
}