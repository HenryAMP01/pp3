import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  checkErrors(control: AbstractControl, error: string): boolean {
    return control.hasError(error);
  }

  toBase64(file: File, callback: any): any {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => callback(
      reader.result
    );
  }

}
