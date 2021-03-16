import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IPageRenderDTO } from 'src/app/core/dtos/page-render/page-render.dto';
import { IStateDTO } from 'src/app/core/dtos/state/state.dto';
import { IState } from 'src/app/core/models/state.model';
import { StateService } from 'src/app/core/services/state/state.service';
import { StateCreateOrUpdateComponent } from '../state-create-or-update/state-create-or-update.component';

@Component({
  selector: 'app-state-all-page',
  templateUrl: './state-all-page.component.html',
  styleUrls: ['./state-all-page.component.css']
})
export class StateAllPageComponent implements OnInit {

  pageRender: IPageRenderDTO;
  states: IStateDTO[] = [];

  pageSizeOptions: number[] = [5, 10, 15];
  displayedColumns: string[] = ['Id', 'Code', 'Name', 'Actions'];

  constructor(private stateService: StateService, private matDialog: MatDialog, private snackBar: MatSnackBar) { }

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

  createState(): void {

    const matDialogRef = this.matDialog.open(StateCreateOrUpdateComponent, { width: '100%' });

    matDialogRef.afterClosed().subscribe(
      (state: IStateDTO) => {
        if (state) {
          this.states = [...this.states];
          this.states.push(state);
          this.snackBar.open('State created!', 'close', { duration: 3500 });
        }
      }
    );

  }

  updateState(state: IState, index: number): void {
    const matDialogRef = this.matDialog.open(StateCreateOrUpdateComponent, {
      data: state,
      width: '100%'
    });

    matDialogRef.afterClosed().subscribe(
      (result: IStateDTO) => {
        if (result) {
          this.states = [...this.states];
          this.states.splice(index, 1, result);
          this.snackBar.open('State updated!', 'close', { duration: 3500 });
        }
      }
    );
  }

  deleteById(id: number, index: number): void {

    this.stateService.deleteById(id).subscribe(
      () => {

        this.states = [...this.states];
        this.states.splice(index, 1);

        this.snackBar.open('State deleted!', 'close', {
          duration: 3500
        });

      });

  }

  // Fetchs

  private findCategoriesAllpage(page: number, size: number): void {
    this.stateService.findAllPage(page, size).subscribe(
      (pageRender: IPageRenderDTO) => {
        this.pageRender = pageRender;
        this.states = this.pageRender.content;
      });
  }


}
