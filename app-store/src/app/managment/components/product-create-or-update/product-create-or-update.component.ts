import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ICategoryDTO } from 'src/app/core/dtos/category/category.dto';
import { IProduct, Product } from 'src/app/core/models/product.model';

import { CategoryService } from 'src/app/core/services/category/category.service';
import { ProductService } from 'src/app/core/services/product/product.service';
import { UtilService } from 'src/app/core/services/util/util.service';

import { CustomValidator } from 'src/app/core/validators/custom-validator.validator';



@Component({
  selector: 'app-product-managment-create-update',
  templateUrl: './product-create-or-update.component.html',
  styleUrls: ['./product-create-or-update.component.css']
})
export class ProductCreateOrUpdateComponent implements OnInit {

  // Variables

  form: FormGroup;
  image: File;
  product: IProduct;
  categoryOptions: ICategoryDTO[] = [];

  constructor(
    public matDialogRef: MatDialogRef<ProductCreateOrUpdateComponent>,
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private utilService: UtilService,
    @Inject(MAT_DIALOG_DATA) public data: IProduct
  ) {

    this.product = JSON.parse(JSON.stringify(data));

    this.buildForm();
  }

  ngOnInit(): void {
    this.categoryService.findAll().subscribe(
      categories => this.categoryOptions = categories
    );
  }

  // Events

  onSelectionImage(event: any): void {
    const image = event.target.files[0];
    this.image = image;
    this.utilService.toBase64(image, (
      (base64: string) => {
        this.setImageBase64(base64);
      })
    );
  }

  onClickCancelImage(): void {
    this.image = null;
    this.getImage().setValue([]);
  }

  onClickCancelProductImage(): void {
    this.product.image = '';
    this.getImageBase64().setValue([]);
    this.getImage().setValidators(Validators.compose([Validators.required, CustomValidator.isValidFormatImage]));
    this.form.updateValueAndValidity();
  }

  onSubmit(event: Event): void {

    event.preventDefault();

    if (this.form.valid) {

      const product = this.newProduct();

      console.log(product);

      if (this.product) {
        this.updateById(product);
      } else {
        this.save(product);
      }

    } else {
      window.alert('Invalid form!');
    }

  }

  // Utils

  checkErrors(control: AbstractControl, error: string): boolean {
    return this.utilService.checkErrors(control, error);
  }

  // Getters y setters

  getCode(): AbstractControl {
    return this.form.get('code');
  }

  getName(): AbstractControl {
    return this.form.get('name');
  }

  getPrice(): AbstractControl {
    return this.form.get('price');
  }

  getDescription(): AbstractControl {
    return this.form.get('description');
  }

  getCategory(): AbstractControl {
    return this.form.get('category');
  }

  getImage(): AbstractControl {
    return this.form.get('image');
  }

  getImageBase64(): AbstractControl {
    return this.form.get('imageBase64');
  }

  // Create product

  private newProduct(): IProduct {
    const product: IProduct = new Product(
      this.getCode().value,
      this.getName().value,
      this.getPrice().value,
      this.getDescription().value,
      this.getCategory().value,
      this.getImageBase64().value
    );
    return product;
  }

  // Form settings

  private buildForm(): void {
    this.form = this.fb.group({
      code: this.fb.control([], Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(255)])),
      name: this.fb.control([], Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(255)])),
      price: this.fb.control(0, Validators.compose([Validators.required, Validators.min(0)])),
      description: this.fb.control([], Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(1500)])),
      category: this.fb.control([], Validators.compose([Validators.required])),
      image: this.fb.control([], Validators.compose([Validators.required, CustomValidator.isValidFormatImage])),
      imageBase64: this.fb.control([], Validators.compose([Validators.required]))
    });

    if (this.product) {
      this.initForm();
    }

  }

  private initForm(): void {
    this.form.patchValue({
      code: this.product.code,
      name: this.product.name,
      price: this.product.price,
      description: this.product.description,
      category: this.product.category,
      imageBase64: this.product.image,
    });

    this.getImage().setValidators([]);
    this.form.updateValueAndValidity();
  }

  // Fetch

  private save(product: IProduct): void {
    this.productService.save(product).subscribe(
      result => this.matDialogRef.close(result)
    );
  }

  private updateById(product: IProduct): void {
    this.productService.updateById(this.product.id, product).subscribe(
      result => this.matDialogRef.close(result)
    );
  }

  // control

  private setImageBase64(imageBase64: string): void {
    this.getImageBase64().setValue(imageBase64);
  }

}
