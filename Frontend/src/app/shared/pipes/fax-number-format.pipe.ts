import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'faxNumberFormat'
})
export class FaxNumberFormatPipe implements PipeTransform {

  transform(faxNumber: string): string {
    // Assuming phoneNumber is a string of 11 digits, e.g., "05465784738"
    if (!faxNumber || faxNumber.length !== 11) {
      return faxNumber; // Return as is if not valid
    }


    const prefix = '+';
    const part0 = faxNumber.slice(0, 1);  //0
    const part1 = faxNumber.slice(1, 3); // 546
    const part2 = faxNumber.slice(3, 6); // 578
    const part3 = faxNumber.slice(6);    // 4738

    return `${prefix} (${part0})-(${part1})-(${part2})-(${part3})`;
  }

}
