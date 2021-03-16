import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IBillDTO } from '../../dtos/bill/bill.dto';
import { IPayuDTO } from '../../dtos/payu/payu.dto';

@Injectable({
  providedIn: 'root'
})
export class PaidService {

  private urlEndPoint = environment.apiUrl.concat('paids');

  constructor(private httpCliente: HttpClient) { }

  findDataPayuByBill(bill: IBillDTO, email: string): Observable<IPayuDTO> {
    return this.httpCliente.post<IPayuDTO>(`${this.urlEndPoint}/data-payu/${email}`, bill);
  }

  paid(referenceCode: string , transactionState: string): Observable<any> {
    let paramsRequest = new HttpParams();
    paramsRequest = paramsRequest.append('referenceCode', referenceCode);
    paramsRequest = paramsRequest.append('transactionState', transactionState);
    console.log('params: ', paramsRequest);
    return this.httpCliente.post<any>(`${this.urlEndPoint}/payu-response`, null, {params: paramsRequest});
  }

  onSubmitPaidInPayu(payuData: IPayuDTO) {

    const formPayu = document.createElement('form');
    formPayu.method = 'POST';
    formPayu.action = 'https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu';
    formPayu.target = 'blank';
    formPayu.style.display = 'none';

    const apiKey = document.createElement('input');
    apiKey.type = 'hidden';
    apiKey.name = 'ApiKey';
    apiKey.value = payuData.ApiKey;
    formPayu.appendChild(apiKey);

    const signature = document.createElement('input');
    signature.type = 'hidden';
    signature.name = 'signature';
    signature.value = payuData.signature;
    formPayu.appendChild(signature);

    const merchantId = document.createElement('input');
    merchantId.type = 'hidden';
    merchantId.name = 'merchantId';
    merchantId.value = payuData.merchantId;
    formPayu.appendChild(merchantId);

    const accountId = document.createElement('input');
    accountId.type = 'hidden';
    accountId.name = 'accountId';
    accountId.value = payuData.accountId;
    formPayu.appendChild(accountId);

    const description = document.createElement('input');
    description.type = 'hidden';
    description.name = 'description';
    description.value = payuData.description;
    formPayu.appendChild(description);

    const tax = document.createElement('input');
    tax.type = 'hidden';
    tax.name = 'tax';
    tax.value = payuData.tax;
    formPayu.appendChild(tax);

    const taxReturnBase = document.createElement('input');
    taxReturnBase.type = 'hidden';
    taxReturnBase.name = 'taxReturnBase';
    taxReturnBase.value = payuData.taxReturnBase;
    formPayu.appendChild(taxReturnBase);

    const amount = document.createElement('input');
    amount.type = 'hidden';
    amount.name = 'amount';
    amount.value = payuData.amount;
    formPayu.appendChild(amount);

    const referenceCode = document.createElement('input');
    referenceCode.type = 'hidden';
    referenceCode.name = 'referenceCode';
    referenceCode.value = payuData.referenceCode;
    formPayu.appendChild(referenceCode);

    const currency = document.createElement('input');
    currency.type = 'hidden';
    currency.name = 'currency';
    currency.value = payuData.currency;
    formPayu.appendChild(currency);

    const buyerEmail = document.createElement('input');
    buyerEmail.type = 'hidden';
    buyerEmail.name = 'buyerEmail';
    buyerEmail.value = payuData.buyerEmail;
    formPayu.appendChild(buyerEmail);

    const test = document.createElement('input');
    test.type = 'hidden';
    test.name = 'test';
    test.value = payuData.test;
    formPayu.appendChild(test);

    const confirmationUrl = document.createElement('input');
    confirmationUrl.type = 'hidden';
    confirmationUrl.name = 'confirmationUrl';
    confirmationUrl.value = payuData.confirmationUrl;
    formPayu.appendChild(confirmationUrl);

    const responseUrl = document.createElement('input');
    responseUrl.type = 'hidden';
    responseUrl.name = 'responseUrl';
    responseUrl.value = payuData.responseUrl;
    formPayu.appendChild(responseUrl);

    document.body.appendChild(formPayu);
    formPayu.submit();
  }
}
