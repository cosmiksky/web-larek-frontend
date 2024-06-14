import { Api, ApiListResponse } from './base/api';
import { ICard, IOrder, ISuccessfulOrder } from '../types/index';

interface ILarekApi {
	getCardsId: (id: string) => Promise<ICard>;
	getOrder: (order: IOrder) => Promise<ISuccessfulOrder>;
	getCards: () => Promise<ICard[]>;
}

export class LarekApi extends Api implements ILarekApi {
	readonly cdn: string;
	constructor(cdn: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
		this.cdn = cdn;
	}

	getCards(): Promise<ICard[]> {
		return this.get('/product')
		  .then((data: ApiListResponse<ICard>) =>
			data.items.map((item) => ({
				...item,
				image: this.cdn + item.image,
			}))
		);
	}

	getCardsId(id: string): Promise<ICard>{
		return this.get(`/product/${id}`)
		  .then((item:ICard) => ({...item,image:this.cdn + item.image,}))
	}

	getOrder(order: IOrder): Promise<ISuccessfulOrder>{
		return this.post('/order', order)
		  .then((res: ISuccessfulOrder) => ({
			id: res.id,
			total: res.total
		  }));
	}
}