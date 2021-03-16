import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ICategoryDTO } from 'src/app/core/dtos/category/category.dto';
import { IPageRenderDTO } from 'src/app/core/dtos/page-render/page-render.dto';
import { ICategory } from 'src/app/core/models/category.model';
import { CategoryService } from 'src/app/core/services/category/category.service';
import { CategoryCreateOrUpdateComponent } from '../category-create-or-update/category-create-or-update.component';

@Component({
  selector: 'app-category-all-page',
  templateUrl: './category-all-page.component.html',
  styleUrls: ['./category-all-page.component.css']
})
export class CategoryAllPageComponent implements OnInit {

  pageRender: IPageRenderDTO;
  categories: ICategoryDTO[] = [];

  pageSizeOptions: number[] = [5, 10, 15];
  displayedColumns: string[] = ['Id', 'Code', 'Name', 'Actions'];

  constructor(private categoryService: CategoryService, private matDialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    const pageFirstTime = 0;
    const sizeFirstTime = 5;
    this.findCategoriesAllpage(pageFirstTime, sizeFirstTime);
  }

  // Events

  pageEvent(event: PageEvent): void {
    const page = event.pageIndex;
    const size = event.pageSize;
    this.findCategoriesAllpage(page, size);
  }

  // Utils

  createCategory(): void {

    const matDialogRef = this.matDialog.open(CategoryCreateOrUpdateComponent, {width: '100%'});

    matDialogRef.afterClosed().subscribe(
      (category: ICategoryDTO) => {
        if (category) {
          this.categories = [...this.categories];
          this.categories.push(category);
          this.snackBar.open('Category created!', 'close', { duration: 3500 });
        }
      }
    );

  }

  updateCategory(category: ICategory, index: number): void {
    const matDialogRef = this.matDialog.open(CategoryCreateOrUpdateComponent, {
      data: category,
      width: '100%'
    });

    matDialogRef.afterClosed().subscribe(
      (result: ICategoryDTO) => {
        if (result) {
          this.categories = [...this.categories];
          this.categories.splice(index, 1, result);
          this.snackBar.open('Category updated!', 'close', { duration: 3500 });
        }
      }
    );
  }

  deleteById(id: number, index: number): void {

    this.categoryService.deleteById(id).subscribe(
      () => {

        this.categories = [...this.categories];
        this.categories.splice(index, 1);

        this.snackBar.open('Category deleted!', 'close', {
          duration: 3500
        });

      });

  }

  // Fetchs

  private findCategoriesAllpage(page: number, size: number): void {
    this.categoryService.findAllPage(page, size).subscribe(
      (pageRender: IPageRenderDTO) => {
        this.pageRender = pageRender;
        this.categories = this.pageRender.content;
      });
  }

}
