import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { IProductDTO } from 'src/app/core/dtos/product/product.dto';

import { CartService } from 'src/app/core/services/cart/cart.service';
import { ProductService } from 'src/app/core/services/product/product.service';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product: IProductDTO;

  constructor(private route: ActivatedRoute, private productService: ProductService, private cartService: CartService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = params.id;
      this.findProductById(id);
    });
  }

  // Fetchs

  findProductById(id: number): void{
    this.productService.findById(id).subscribe(
      (product: IProductDTO) => this.product = product
    );
  }

  // Utils

  onClickAddProductInUserCart(product: IProductDTO): void{
    this.cartService.addProductInUserCart(product);
  }

}
