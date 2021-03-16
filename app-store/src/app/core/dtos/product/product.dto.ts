import { ICategoryDTO } from '../category/category.dto';

export interface IProductDTO{
    id: number;
    code: string;
    name: string;
    price: number;
    image: string;
    description: string;
    category: ICategoryDTO;
}
