import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IBillWithUserDTO } from 'src/app/core/dtos/bill/bill-with-user.dto';
import { IBillDTO } from 'src/app/core/dtos/bill/bill.dto';
import { IPageRenderDTO } from 'src/app/core/dtos/page-render/page-render.dto';
import { IStateDTO } from 'src/app/core/dtos/state/state.dto';
import { Bill } from 'src/app/core/models/bill.model';
import { BillService } from 'src/app/core/services/bill/bill.service';
import { StateService } from 'src/app/core/services/state/state.service';

@Component({
  selector: 'app-bill-all-page',
  templateUrl: './bill-all-page.component.html',
  styleUrls: ['./bill-all-page.component.css']
})
export class BillAllPageComponent implements OnInit {

  pageRender: IPageRenderDTO;
  bills: IBillWithUserDTO[] = [];
  states: IStateDTO[] = [];
  statesForm: FormGroup;

  pageSizeOptions: number[] = [5, 10, 15];
  displayedColumns: string[] = ['Id', 'User', 'Address', 'Total', 'Payment', 'Paid out', 'State', 'Create at', 'Update at'];

  constructor(
    private billService: BillService,
    private stateService: StateService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder) {
    this.statesForm = this.fb.group({});
  }

  ngOnInit(): void {
    const pageFirstTime = 0;
    const sizeFirstTime = 10;
    this.stateService.findAll().subscribe(
      states => this.states = [...states]
    );
    this.findBillsAllpage(pageFirstTime, sizeFirstTime);
  }

  // Events

  pageEvent(event: PageEvent): void {
    const page = event.pageIndex;
    const size = event.pageSize;
    this.findBillsAllpage(page, size);
  }

  onChangeState(event: IStateDTO, bill: IBillDTO, index: number): void{
    if(event.id !== bill.id){
      const billUpdate: Bill = JSON.parse(JSON.stringify(bill));
        billUpdate.state = event;
      console.log('bill update: ', billUpdate);
      this.billService.update(billUpdate).subscribe(b=>{
        this.bills = [...this.bills];
        this.bills.splice(index, 1, b );
        this.snackBar.open('State updated!', 'close', {duration: 3500});
      });
    }
  }

  getReactiveControl(controlName: string): AbstractControl {
    return this.statesForm.get(controlName);
  }

  // Fetchs

  private findBillsAllpage(page: number, size: number): void {
    this.billService.findAllPageWithUser(page, size).subscribe(
      (pageRender: IPageRenderDTO) => {
        this.pageRender = pageRender;
        this.bills = this.pageRender.content;
        this.bills.forEach(b => this.addStateControl(b));
        console.log(this.bills);
      });
  }

  private addStateControl(bill: IBillDTO) {
    if(bill.paidOut){
      this.statesForm.addControl(
        bill.id.toString(10),
        new FormControl()
      );
      console.log('Added control in form state form: ', this.statesForm.controls);
    }
  }

}
