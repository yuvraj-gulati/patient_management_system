// import { Component, OnInit, ViewChild } from '@angular/core';
// import { AddOrganizationModalComponent } from '../add-organization-modal/add-organization-modal.component';
// import { OrganizationService } from '../service/organization.service';
// import * as data from '../json/organizationData.json';
// import { ToastrService } from 'ngx-toastr';


// interface Address {
//   country: string;
//   state: string;
//   city: string;
//   streetAddress: string;
// }

// interface Organization {
//   id : number;
//   organizationName: string;
//   businessKey: string;
//   email: string;
//   mobileNumber: string;
//   faxNumber: string;
//   address: Address[];
//   isActive : boolean;
// }



// @Component({
//   selector: 'app-organization-info',
//   templateUrl: './organization-info.component.html',
//   styleUrls: ['./organization-info.component.css']
// })


// export class OrganizationInfoComponent implements OnInit {
//   @ViewChild(AddOrganizationModalComponent) addOrganizationComponent!: AddOrganizationModalComponent;
  

//   // organizationInfoData : Organization[] =(data as any).default;
//   organizationInfoData : Organization[] = [];

//   constructor(private orgService: OrganizationService, private toastr: ToastrService){}


//   ngOnInit(): void {
//       this.getOrganizationData();
//   }


//   getOrganizationData(){
//     this.orgService.getAllOrganization().subscribe(data => {
//       // console.log(data);
//       this.organizationInfoData = data.data;
//       console.log(this.organizationInfoData);
//     })
//   }

   
//   //Used to track current page number
//   currentPage: number = 1;

//   //used to set how many organizaton should be shown on a single page of table
//   itemsPerPage: number = 5;


//   //Method used to give only 10 patient details as an array to populate table
//   //Method slice the organizationInfoData our json patient data based on startIndex
//   paginatedPatientInfo(): any[] {
//     const startIndex = (this.currentPage - 1) * this.itemsPerPage;
//     return this.organizationInfoData.slice(startIndex, startIndex + this.itemsPerPage);
//   }

//   //Method used to update the current page when clicked
//   onPageChange(pageNumber: number): void {
//     this.currentPage = pageNumber;
//   }

//   //Method used to calculate total number of pages
//   totalPages(): number[] {
//     return Array(Math.ceil(this.organizationInfoData.length / this.itemsPerPage)).fill(0).map((x, i) => i + 1);
//   }



//   updatePatient(organization: any): void {
//     this.addOrganizationComponent.updateOrganization(organization);
//   }

//   delete() : void{
//     this.toastr.success('Successfully!', 'Organization Deleted');
//   }



//   //Toggle isActive
//   toggleIsActive(organization: Organization): void {
//     this.orgService.toggleOrganizationIsActive(organization.id).subscribe(() => {
//       this.toastr.success('Successfully!', 'isActive toggled');
//       setTimeout(() => {
//         window.location.reload();
//       }, 500);
//     });
//   }
// }
