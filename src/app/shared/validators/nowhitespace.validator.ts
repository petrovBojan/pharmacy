import { AbstractControl } from '@angular/forms';

export function NoWhitespaceValidator(control: AbstractControl) {
    let isWhitespace = (control.value || '').trim().length === 0;
    let isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true }
}
