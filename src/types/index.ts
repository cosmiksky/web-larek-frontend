export interface IPage{
  counter:number;
  catalog:HTMLElement[];
}

export interface ICard{
  id:string;
  title:string;
  image:string;
  description:string;
  selected:boolean;
  category:string;
  price:number|null;
}

export interface IModal{
  content:HTMLElement;
}

export interface IOrder{
  payment:string;
  total:number;
  address:string;
  phone:string;
  email:string;
  items:string[];
}

export interface IDeliveryForm{
  payment:string;
  address:string;
}

export interface IContactForm{
  email:string;
  phone:string;
}

export interface IStateApp{
  catalog:ICard[];
  order:IOrder|null;
  basket:ICard[];
  setCatalog(items: ICard[]): void;
  getResultBasket(): number;
}
export interface IValid{
  phone:string;
  email:string;
  address:string;
  payment:string;
}

export interface IForm{
  valid: boolean
  errors: string[];
}

export interface ISuccessForm{
  description: number;
}

export interface ISuccessfulOrder{
  id:string;
  total:number;
}
