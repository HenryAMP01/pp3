import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PaidService } from 'src/app/core/services/paid/paid.service';

@Component({
  selector: 'app-payu-response',
  templateUrl: './payu-response.component.html',
  styleUrls: ['./payu-response.component.css']
})
export class PayuResponseComponent implements OnInit {

  constructor(private router: Router, private paidService: PaidService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    const url = this.router.parseUrl(this.router.url);
    const referenceCode = url.queryParams.referenceCode;
    const transactionState = url.queryParams.transactionState;
    console.log('referenceCode: ', referenceCode, ', transactionState: ', transactionState);
    this.paidService.paid(referenceCode, transactionState).subscribe(() =>{
      this.router.navigate(['/store/products/all-page']);
      this.snackBar.open('Paid completed!', 'close', {duration: 3500});
    });
  }

}
