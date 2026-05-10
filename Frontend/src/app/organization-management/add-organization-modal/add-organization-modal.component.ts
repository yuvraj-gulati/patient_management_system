// import { HttpClient } from '@angular/common/http';
// import { Component, OnInit } from '@angular/core';
// import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
// import * as countries from '../json/countries.json';
// import * as states from '../json/states.json';
// import * as cities from '../json/cities.json';
// import { ToastrService } from 'ngx-toastr';
// import { OrganizationService } from '../service/organization.service';

// @Component({
//   selector: 'app-add-organization-modal',
//   templateUrl: './add-organization-modal.component.html',
//   styleUrls: ['./add-organization-modal.component.css'],
// })
// export class AddOrganizationModalComponent {
//   addOrganizationForm: FormGroup;

//   countries: any[] = (countries as any).default;
//   states: any = (states as any).default;
//   cities: any = (cities as any).default;
//   filteredStates: any[][] = [];
//   filteredCities: any[][] = [];

//   editMode: boolean = false;
//   currentOrganizationId: number | null = null;

//   constructor(
//     private http: HttpClient,
//     private toastr: ToastrService,
//     private organizationService: OrganizationService
//   ) {
//     this.addOrganizationForm = new FormGroup({
//       organizationName: new FormControl('', [Validators.required]),
//       businessKey: new FormControl('', [Validators.required]),
//       organizationEmail: new FormControl('', [
//         Validators.required,
//         Validators.email,
//       ]),
//       organizationMobileNumber: new FormControl('', [Validators.required]),
//       organizationFaxNumber: new FormControl('', [Validators.required]),

//       organizationAddressList: new FormArray([this.getAddressFields()]),
//     });

//     this.initializeFilteredStatesAndCities();
//   }

//   //Returns the object of controls with type FormGroup
//   getAddressFields(): FormGroup {
//     return new FormGroup({
//       organization_country: new FormControl('', [Validators.required]),
//       organization_state: new FormControl('', [Validators.required]),
//       organization_city: new FormControl('', [Validators.required]),
//       organization_street: new FormControl('', [Validators.required]),
//     });
//   }

//   //Returns the formarray from addOrganizationForm
//   //returns AbstractControl object is then type-cast to a FormArray using the as FormArray
//   organizationAddressListArray(): FormArray {
//     return this.addOrganizationForm.get('organizationAddressList') as FormArray;
//   }

//   //Used to add new controls to the address list array
//   //And also initializing the state and cities to empty
//   addOrganizationAddress() {
//     this.organizationAddressListArray().push(this.getAddressFields());
//     this.filteredStates.push([]);
//     this.filteredCities.push([]);
//   }

//   //Removes the control on the basis of index i
//   removeOrganizationAddress(i: number) {
//     this.organizationAddressListArray().removeAt(i);

//     this.filteredStates.splice(i, 1);
//     this.filteredCities.splice(i, 1);
//   }

//   //Helper function to get the array of state using country name
//   filterStatesByCountryName(countryName: string): any[] {
//     const selectedCountry = this.countries.find(
//       (country) => country.name === countryName
//     );
//     if (selectedCountry) {
//       const countryId = selectedCountry.id.toString(); // Convert to string to match JSON keys
//       return this.states[countryId] || [];
//     }
//     return [];
//   }

//   //Function to change the values of state on the change of country dropdown
//   onCountryChange(index: number) {
//     const countryName = this.organizationAddressListArray()
//       .at(index)
//       .get('organization_country')?.value;
//     this.filteredStates[index] = this.filterStatesByCountryName(countryName);
//     this.filteredCities[index] = [];
//     this.organizationAddressListArray()
//       .at(index)
//       .get('organization_state')
//       ?.setValue('');
//     this.organizationAddressListArray()
//       .at(index)
//       .get('organization_city')
//       ?.setValue('');
//   }

//   //Helper function to get the array of city using state name
//   filterCitiesByStateName(stateName: string): any[] {
//     let stateid;
//     for (let key in this.states) {
//       const stateArray = this.states[key];

//       for (let i of stateArray) {
//         if (i.name === stateName) {
//           stateid = i.id;
//           break;
//         }
//       }
//     }

//     return this.cities[stateid];
//   }

//   //Function to change the values of cities on the change of state dropdown
//   onStateChange(index: number) {
//     const stateName = this.organizationAddressListArray()
//       .at(index)
//       .get('organization_state')?.value;

//     this.filteredCities[index] = this.filterCitiesByStateName(stateName);
//     this.organizationAddressListArray()
//       .at(index)
//       .get('organization_city')
//       ?.setValue('');
//   }

//   //Function used to instialize filtered state and city array to
//   initializeFilteredStatesAndCities() {
//     this.filteredStates = this.organizationAddressListArray().controls.map(
//       () => []
//     );
//     this.filteredCities = this.organizationAddressListArray().controls.map(
//       () => []
//     );
//   }

//   // Patch values into form when editing
//   patchOrganizationValues(organization: any) {
//     // Set edit mode and current organization ID
//     this.editMode = true;
//     this.currentOrganizationId = organization.id;

//     this.addOrganizationForm.patchValue({
//       organizationName: organization.organizationName,
//       businessKey: organization.businessKey,
//       organizationEmail: organization.organizationEmail,
//       organizationMobileNumber: organization.organizationMobileNumber,
//       organizationFaxNumber: organization.organizationFaxNumber,
//     });

//     this.organizationAddressListArray().clear();

//     // Assuming organization has multiple addresses, you need to patch each address separately
//     organization.organizationAddressList.forEach((address: any, index: number) => {
//       const addressFormGroup = this.getAddressFields();

//       addressFormGroup.patchValue({
//         organization_country: address.organization_Country,
//         organization_state: address.organization_State,
//         organization_city: address.organization_City,
//         organization_street: address.organization_Street,
//       });
//       // this.organizationAddressListArray().setControl(index, addressFormGroup);
//       this.organizationAddressListArray().push(addressFormGroup);
//     });



//     // Update filtered states and cities based on patched values
//     // this.filteredStates = organization.organizationAddressList.map(() => []);
//     // this.filteredCities = organization.organizationAddressList.map(() => []);
//     // organization.organizationAddressList.forEach(
//     //   (address: any, index: number) => {
//     //     this.onCountryChange(index);
//     //     this.onStateChange(index);
//     //   }
//     // );
//   }

//   //Update address
//   updateOrganization(organization: any): void {
//     this.patchOrganizationValues(organization);
//   }

//   onSubmitAddOrganization(): void {
//     if (this.addOrganizationForm.valid) {
//       console.log(this.addOrganizationForm.value);

//       this.organizationService
//         .addOrganization(this.addOrganizationForm.value)
//         .subscribe({
//           next: (response) => {
//             if (response.success) {
//               this.toastr.success(response.message);
//             } else {
//               this.toastr.error(response.message);
//             }
//           },
//           error: (error) => {
//             if (error.error && error.error.message) {
//               this.toastr.error(error.error.message, 'Error!');
//             } else {
//               this.toastr.error('An unexpected error occurred.', 'Error!');
//             }
//           },
//         });
//     } 
//     else {
//       this.toastr.error('Please fill all required fields');
//     }
//   }

//   //When model gets close or dismissed
//   onModalHidden() {
//     this.editMode = false;
//     this.currentOrganizationId = null;
//     this.addOrganizationForm.reset();
//     this.initializeFilteredStatesAndCities();
//   }
// }
