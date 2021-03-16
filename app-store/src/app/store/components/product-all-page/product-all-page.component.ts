import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

import { IPageRenderDTO } from 'src/app/core/dtos/page-render/page-render.dto';
import { IProductDTO } from 'src/app/core/dtos/product/product.dto';
import { IProduct } from 'src/app/core/models/product.model';
import { CartService } from 'src/app/core/services/cart/cart.service';

import { ProductService } from 'src/app/core/services/product/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './product-all-page.component.html',
  styleUrls: ['./product-all-page.component.css']
})
export class ProductAllPageComponent implements OnInit {

  pageRender: IPageRenderDTO;
  products: IProductDTO[] = [];
  pageSizeOptions: number[] = [5, 10, 15];

  constructor(private productService: ProductService, private cartService: CartService) { }

  ngOnInit(): void {
    const pageFirstTime = 0;
    const sizeFirstTime = 5;
    this.findProductsWithPagination(pageFirstTime, sizeFirstTime);
  }

  // Fetchs

  findProductsWithPagination(page: number, size: number): void {
    this.productService.findAllPage(page, size).subscribe(
      pageRender => {
        this.pageRender = pageRender;
        this.products = this.pageRender.content;
      });
  }

  // Events

  pageEvent(event: PageEvent): void {
    const page = event.pageIndex;
    const size = event.pageSize;
    this.findProductsWithPagination(page, size);
  }

  onClickAddProductInUserCart(product: IProductDTO): void {
    this.cartService.addProductInUserCart(product);
  }

}
