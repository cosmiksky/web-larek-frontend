import { IStateApp, ICard, IOrder } from "../types";
import { Model } from "./base/model";

type messageError = Partial<Record<keyof IOrder, string>>;
interface IValid{
	phone: string;
    email: string;
	address: string;
    payment: string;
}

export class StateApp extends Model<IStateApp> {
    catalog: ICard[];
    basket: ICard[] = [];
    preview: string | null;
    order: IOrder = this.getOrder();
    messageError: messageError = {};


    setCatalog(items: ICard[]) {
      this.catalog = items;
      this.emitChanges('items:changed')
    }

    setCardPreview(item: ICard) {
        this.preview = item.id
        this.emitChanges('preview:changed', item)
    }

    addToBasket(item: ICard) {
        this.basket.push(item)
    }

    removeFromBasket(items: ICard) {
        this.basket = this.basket.filter((item) => item.id !== items.id)
    }

    getTotalBasketPrice() {
        let total = 0;
        this.basket.forEach((item) => {
            total = total + item.price;
        })

        return total;
    }

    getCountCardBasket() {
        return this.basket.length;
    }

    getOrder(): IOrder {
        return {
            payment: '',
            address: '',
            email: '',
            phone: '',
            items: [],
            total: 0,
        }
    }

    selected(): void {
        this.order.items = this.basket.map((items) => items.id);
    }

    clearBasket(): void {
        this.basket = [];
    }

    clearOrder(): void {
        this.order = this.getOrder();
    }

    resetSelected(): void {
        this.catalog.forEach((items) => {
            items.selected = false;
        })
    }

    validateOrder(): boolean {
		const errors: typeof this.messageError = {};

		if (!this.order.address) {
			errors.address = 'Необходимо указать адрес';
		}
		if (!this.order.payment) {
			errors.payment = 'Необходимо выбрать способ оплаты';
		}

		this.messageError = errors;

		this.evt.emit('orderErr:change', this.messageError);

		return Object.keys(errors).length === 0;
	}

    validateContact(): boolean {
		const errors: typeof this.messageError = {};

		if (!this.order.email) {
			errors.email = 'Необходимо указать email';
		}
		if (!this.order.phone) {
			errors.phone = 'Необходимо указать телефон';
		}

		this.messageError = errors;
		this.evt.emit('contactErr:change', this.messageError);

		return Object.keys(errors).length === 0;
	}

    setOrderInput(field: keyof IValid, value: string) {
        this.order[field] = value;
        if(!this.validateOrder()) {
            return
        }
        if(!this.validateContact()) {
            return
        }
    }
}