// import { Component, OnInit} from '@angular/core';
// import { ProviderService } from '../service/provider.service';

// @Component({
//   selector: 'app-provider-info',
//   templateUrl: './provider-info.component.html',
//   styleUrls: ['./provider-info.component.css']
// })
// export class ProviderInfoComponent implements OnInit {
//   providerData : any;

//   constructor(private providerService : ProviderService){}

//   ngOnInit(): void {
//       this.getProviderInto();
//   }


//   getProviderInto() {
//     this.providerService.getProviderInfo().subscribe(data => {
//       this.providerData = data;
//     });
//   }


  

   
//   //Used to track current page number
//   currentPage: number = 1;

//   //used to set how many patient should be shown on a single page of table
//   itemsPerPage: number = 10;


//   //Method used to give only 10 patient details as an array to populate table
//   //Method slice the patientInfoData our json patient data based on startIndex
//   paginatedPatientInfo(): any[] {
//     const startIndex = (this.currentPage - 1) * this.itemsPerPage;
//     return this.providerData.slice(startIndex, startIndex + this.itemsPerPage);
//   }

//   //Method used to update the current page when clicked
//   onPageChange(pageNumber: number): void {
//     this.currentPage = pageNumber;
//   }

//   //Method used to calculate total number of pages
//   totalPages(): number[] {
//     return Array(Math.ceil(this.providerData.length / this.itemsPerPage)).fill(0).map((x, i) => i + 1);
//   }



  
// }
