import { IEvents } from "./base/events";
import { Form } from "./common/form";
import { IContactForm } from "../types";

export class ContactForm extends Form<IContactForm> {
    constructor(container: HTMLFormElement, evt: IEvents) {
        super(container, evt)
    }

    set email(value: string) {
        (this.container.elements.namedItem('email') as HTMLInputElement).value = value
    }

    set phone(value: string) {
        (this.container.elements.namedItem('phone') as HTMLInputElement).value = value
    }

    clear() {
        this.email = ''
        this.phone = ''
    }
}