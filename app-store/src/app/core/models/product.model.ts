import { ICategory } from './category.model';

export interface IProduct {
  code: string;
  name?: string;
  price?: number;
  description?: string;
  category?: ICategory;
  image?: string;
  id?: number;
  createAt?: Date;
  updateAt?: Date;
}

export class Product implements IProduct {

  constructor(
    public code: string,
    public name: string,
    public price: number,
    public description: string,
    public category: ICategory,
    public image?: string,
    public id?: number,
    public createAt?: Date,
    public updateAt?: Date
    ) {}
}
