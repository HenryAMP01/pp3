import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category, ICategory } from 'src/app/core/models/category.model';
import { CategoryService } from 'src/app/core/services/category/category.service';
import { UtilService } from 'src/app/core/services/util/util.service';

@Component({
  selector: 'app-category-create-or-update',
  templateUrl: './category-create-or-update.component.html',
  styleUrls: ['./category-create-or-update.component.css']
})
export class CategoryCreateOrUpdateComponent implements OnInit {

  // Variables

  form: FormGroup;
  category: ICategory;

  constructor(
    public matDialogRef: MatDialogRef<CategoryCreateOrUpdateComponent>,
    private fb: FormBuilder,
    private utilService: UtilService,
    private categoryService: CategoryService,
    @Inject(MAT_DIALOG_DATA) public data: ICategory
  ) {

    this.category = JSON.parse(JSON.stringify(data));
    this.buildForm();
  }

  ngOnInit(): void { }

  // Events

  onSubmit(event: Event): void {

    event.preventDefault();

    if (this.form.valid) {

      const category = this.newCategory();

      if(this.category){
        this.updateById(category);
      }else{
        this.save(category);
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

  // Form settings

  private buildForm(): void {

    this.form = this.fb.group({
      code: this.fb.control([], Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(255)])),
      name: this.fb.control([], Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(255)])),
    });

    if (this.category) {
      this.initForm();
    }
  }

  private initForm(): void {
    this.form.patchValue({
      code: this.category.code,
      name: this.category.name,
    });
  }

  // Create Category

  private newCategory(): ICategory {
    return new Category(this.getCode().value, this.getName().value);
  }

  // Fetch

  private save(category: ICategory): void {
    this.categoryService.save(category).subscribe(
      result => this.matDialogRef.close(result)
    );
  }

  private updateById(category: ICategory): void {
    this.categoryService.updateById(this.category.id, category).subscribe(
      result => this.matDialogRef.close(result)
    );
  }

}
