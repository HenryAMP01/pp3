import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { IProductDTO } from 'src/app/core/dtos/product/product.dto';
import { ProductService } from 'src/app/core/services/product/product.service';

@Component({
  selector: 'app-search-product-to-bill',
  templateUrl: './search-product-to-bill.component.html',
  styleUrls: ['./search-product-to-bill.component.css']
})
export class SearchProductToBillComponent implements OnInit {

  @Output() product = new EventEmitter<string>();

  productField: FormControl;
  productOptions: IProductDTO[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService) {
    this.productField = this.formBuilder.control('');
  }

  ngOnInit(): void {
  }

  // Eventos

  onInputFieldProduct(): void {
    let productFieldValue: string = this.productField.value;
    productFieldValue = productFieldValue.trim();
    console.log('Field product value: ', productFieldValue);
    if (productFieldValue !== null && productFieldValue.length > 0) {
      this.productService.findByNameContaining(productFieldValue).subscribe(
        products => this.productOptions = [...products]
      );
    }
  }

  onOptiondSelectedAutocompleteProduct(event: MatAutocompleteSelectedEvent): void {
    const optionProductSelected = event.option.value;
    console.log('product option selected: ', optionProductSelected);
    this.product.emit(optionProductSelected);
    this.productField.setValue('');
  }

}
