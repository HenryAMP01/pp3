
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

import { IPageRenderDTO } from 'src/app/core/dtos/page-render/page-render.dto';
import { IProductDTO } from 'src/app/core/dtos/product/product.dto';
import { IProduct } from 'src/app/core/models/product.model';

import { ProductService } from 'src/app/core/services/product/product.service';

import { ProductCreateOrUpdateComponent } from '../product-create-or-update/product-create-or-update.component';

@Component({
  selector: 'app-product-managment-all-page',
  templateUrl: './product-all-page.component.html',
  styleUrls: ['./product-all-page.component.css']
})
export class ProductAllPageComponent implements OnInit {

  pageRender: IPageRenderDTO;
  products: IProductDTO[] = [];

  pageSizeOptions: number[] = [5, 10, 15];
  displayedColumns: string[] = ['Id', 'Code', 'Name', 'Price', 'Category', 'Actions'];

  constructor(private productService: ProductService, private matDialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    const pageFirstTime = 0;
    const sizeFirstTime = 5;
    this.findProductsAllpage(pageFirstTime, sizeFirstTime);
  }

  deleteById(id: number, index: number): void {
    this.productService.deleteById(id).subscribe(
      () => {
        this.products = [...this.products];
        this.products.splice(index, 1);
        this.snackBar.open('Product deleted!', 'close', { duration: 3500 });
      }
    );

  }

  // Events

  pageEvent(event: PageEvent): void {
    const page = event.pageIndex;
    const size = event.pageSize;
    this.findProductsAllpage(page, size);
  }

  // Utils

  createProduct(): void {
    const matDialogRef = this.matDialog.open(ProductCreateOrUpdateComponent, {width: '100%'});
    matDialogRef.afterClosed().subscribe(
      (product: IProductDTO) => {
        if (product) {
          //this.products = [...this.products];
          //this.products.push(product);
          this.snackBar.open('Product created!', 'close', { duration: 3500 });
        }
      }
    );
  }

  updateProduct(product: IProduct, index: number): void {
    const matDialogRef = this.matDialog.open(ProductCreateOrUpdateComponent, { data: product, width: '100%' });
    matDialogRef.afterClosed().subscribe(
      (result: IProductDTO) => {
        if (result) {
          /*this.products = [...this.products];
          this.products.splice(index, 1, result);*/
          if(!this.products.includes(result)){ // Codigo corregible
            this.products = [...this.products];
            this.products.splice(index, 1, result);
          }
          this.snackBar.open('Product updated!', 'close', { duration: 3500 });
        }
      }
    );
  }

  // Fetch

  private findProductsAllpage(page: number, size: number): void {
    this.productService.findAllPage(page, size).subscribe(
      (pageRender: IPageRenderDTO) => {
        this.pageRender = pageRender;
        this.products = this.pageRender.content;
      }
    );
  }

}
