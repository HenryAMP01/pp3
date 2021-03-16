import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IPageRenderDTO } from 'src/app/core/dtos/page-render/page-render.dto';
import { IPaymentDTO } from 'src/app/core/dtos/payment/payment.dto';
import { IPayment } from 'src/app/core/models/payment.model';
import { PaymentService } from 'src/app/core/services/payment/payment.service';
import { PaymentCreateOrUpdateComponent } from '../payment-create-or-update/payment-create-or-update.component';

@Component({
  selector: 'app-payment-all-page',
  templateUrl: './payment-all-page.component.html',
  styleUrls: ['./payment-all-page.component.css']
})
export class PaymentAllPageComponent implements OnInit {

  pageRender: IPageRenderDTO;
  payments: IPaymentDTO[] = [];

  pageSizeOptions: number[] = [5, 10, 15];
  displayedColumns: string[] = ['Id', 'Name', 'Actions'];

  constructor(private paymentService: PaymentService, private matDialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    const pageFirstTime = 0;
    const sizeFirstTime = 5;
    this.findPaymentsAllpage(pageFirstTime, sizeFirstTime);
  }

  deleteById(id: number, index: number): void {

    this.paymentService.deleteById(id).subscribe(
      () => {

        this.payments = [...this.payments];
        this.payments.splice(index, 1);

        this.snackBar.open('Payment deleted!', 'close', {
          duration: 3500
        });

      });

  }

  // Events

  pageEvent(event: PageEvent): void {
    const page = event.pageIndex;
    const size = event.pageSize;
    this.findPaymentsAllpage(page, size);
  }

  // Utils

  createPayment(): void {

    const matDialogRef = this.matDialog.open(PaymentCreateOrUpdateComponent, {width: '100%'});

    matDialogRef.afterClosed().subscribe(
      (payment: IPaymentDTO) => {
        if (payment) {
          this.payments = [...this.payments];
          this.payments.push(payment);
          this.snackBar.open('Payment created!', 'close', { duration: 3500 });
        }
      }
    );

  }

  updatePayment(payment: IPayment, index: number): void {
    const matDialogRef = this.matDialog.open(PaymentCreateOrUpdateComponent, {
      data: payment,
      width: '100%'
    });

    matDialogRef.afterClosed().subscribe(
      (result: IPaymentDTO) => {
        if (result) {
          this.payments = [...this.payments];
          this.payments.splice(index, 1, result);
          this.snackBar.open('Payment updated!', 'close', { duration: 3500 });
        }
      }
    );
  }

  // Fetchs

  private findPaymentsAllpage(page: number, size: number): void {
    this.paymentService.findAllPage(page, size).subscribe(
      (pageRender: IPageRenderDTO) => {
        this.pageRender = pageRender;
        this.payments = this.pageRender.content;
      });
  }



}
