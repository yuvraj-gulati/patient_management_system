import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneFormat'
})
export class PhoneFormatPipe implements PipeTransform {

  transform(phoneNumber: string): string {
    // Assuming phoneNumber is a string of 10 digits, e.g., "5465784738"
    if (!phoneNumber || phoneNumber.length !== 10) {
      return phoneNumber; // Return as is if not valid
    }
    const countryCode = '+91';
    const part1 = phoneNumber.slice(0, 3); // 546
    const part2 = phoneNumber.slice(3, 6); // 578
    const part3 = phoneNumber.slice(6);    // 4738

    return `${countryCode} (${part1})-(${part2})-(${part3})`;
  }
}

