import { AbstractControl } from '@angular/forms';

export class CustomValidator {
    static isValidFormatImage(control: AbstractControl): any {
        if (control.value !== null && control.value !== '') {
            const filename: string = control.value.toString();
            const format: string = filename.substring(filename.indexOf('.'));
            const formatValids: string[] = ['.png', '.jpg', '.jpeg'];
            if (!formatValids.includes(format)) {
                return { invalidImageFormat: true };
            }
        }

        return null;
    }
}
