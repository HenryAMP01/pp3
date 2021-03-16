import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IBillDTO } from 'src/app/core/dtos/bill/bill.dto';
import { IPageRenderDTO } from 'src/app/core/dtos/page-render/page-render.dto';
import { IUserDTO } from 'src/app/core/dtos/user/user.dto';
import { BillService } from 'src/app/core/services/bill/bill.service';
import { PaidService } from 'src/app/core/services/paid/paid.service';
import { SecurityService } from 'src/app/core/services/security/security.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-bill-all-page',
  templateUrl: './bill-all-page.component.html',
  styleUrls: ['./bill-all-page.component.css']
})
export class BillAllPageComponent implements OnInit {

  pageRender: IPageRenderDTO;
  bills: IBillDTO[] = [];
  user: IUserDTO;

  pageSizeOptions: number[] = [5, 10, 15];
  displayedColumns: string[] = ['Id', 'Address', 'Total', 'Payment', 'Paid out', 'State', 'Create at', 'Actions'];

  constructor(
    private billService: BillService,
    private userService: UserService,
    private securityService: SecurityService,
    private paidService: PaidService) { }

  ngOnInit(): void {
    const pageFirstTime = 0;
    const sizeFirstTime = 10;
    this.securityService.getAuthenticationState().subscribe(
      account => {
        console.log(account);
        if (account !== null) {
          this.userService.findByEmail(account.subject).subscribe(
            user => {
              this.user = user;
              this.findBillsAllpage(pageFirstTime, sizeFirstTime, this.user);
            });
        }
      });
  }

  // Events

  onClickPaidBill(billDTO: IBillDTO): void {
    this.paidService.findDataPayuByBill(billDTO, this.user.email).subscribe(
      payuData => this.paidService.onSubmitPaidInPayu(payuData)
    );
  }

  pageEvent(event: PageEvent): void {
    const page = event.pageIndex;
    const size = event.pageSize;
    this.findBillsAllpage(page, size, this.user);
  }

  // Fetchs

  private findBillsAllpage(page: number, size: number, user?: IUserDTO): void {
    this.billService.findAllPageByUserEmail(user.email, page, size).subscribe(
      (pageRender: IPageRenderDTO) => {
        this.pageRender = pageRender;
        this.bills = this.pageRender.content;
        console.log(this.bills);
      });
  }

}
