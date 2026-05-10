import { Component, OnInit, ViewChild } from '@angular/core';
import * as jsonPatientInfoData from '../json/patientData.json';
import { AddPatientModalComponent } from '../add-patient-modal/add-patient-modal.component';
import { ExcelService } from '../service/excel.service';
import { PatientServiceService } from '../service/patient-service.service';
import { ToastrService } from 'ngx-toastr';
import { DeletePatientModalComponent } from '../delete-patient-modal/delete-patient-modal.component';

import { IPagination } from '../Interface/IPagination';

@Component({
  selector: 'app-patient-info',
  templateUrl: './patient-info.component.html',
  styleUrls: ['./patient-info.component.css'],
})
export class PatientInfoComponent implements OnInit {
  @ViewChild(AddPatientModalComponent)
  addPatientComponent!: AddPatientModalComponent;

  @ViewChild(DeletePatientModalComponent) deletePatientComponent!: DeletePatientModalComponent;

  constructor(private excelService: ExcelService, private patientService: PatientServiceService, private toastr: ToastrService)
   {
    console.log(this.searchText);
    
   }


  


  deletePatient(id : number){
    this.deletePatientComponent.DeletePatientId(id);
  }

  patientInfoData: any[] = [];


  searchText: string = '';

  

   // Reset to the first page when search changes
   applySearch(): void {
    this.currentPage = 1; 
  }

  //Used to track current page number
  currentPage: number = 1;

  //used to set how many patient should be shown on a single page of table
  itemsPerPage: number = 5;

  records  : any;







 searching() : void {

  const paginationItems  = {
    pageNumber : this.currentPage,
    pageSize : this.itemsPerPage,
    searchText : this.searchText
  }


  this.patientService.searchRecords(paginationItems).subscribe({
    next : (res) => {
      this.patientInfoData = res.patients;
      console.log(res);
    },

    error : (err) => {
      console.log(err);
    }
  })
 }






  onItemsPerPageChange(value: string): void {
    this.itemsPerPage = parseInt(value, 10); 
    this.currentPage = 1;
  }




  ngOnInit(): void {
    this.getAllPatients();
  }

  getAllPatients() : void {
    this.patientService.getAllPatient().subscribe({
      next : (res) => {
        if(res.success){
          this.patientInfoData = res.records;
          console.log(this.patientInfoData);
          this.toastr.success('Successfully!', res.message);
        }
        else{
          this.toastr.error(res.message);
        }
      },

      error : (error) => {
        if (error.error && error.error.message) {
          this.toastr.error(error.error.message, 'Error!');
        } else {
          this.toastr.error('An unexpected error occurred.', 'Error!');
        }
      }
    })
  }


  //Method used to give only 10 patient details as an array to populate table
  //Method slice the patientInfoData our json patient data based on startIndex
  paginatedPatientInfo(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.patientInfoData.slice(
      startIndex,
      startIndex + this.itemsPerPage
    );
  }

  //Method used to update the current page when clicked
  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
  }

  //Method used to calculate total number of pages
  totalPages(): number[] {
    return Array(Math.ceil(this.patientInfoData.length / this.itemsPerPage))
      .fill(0)
      .map((x, i) => i + 1);
  }



  updatePatient(patient: any): void {
    this.addPatientComponent.updatePatient(patient);
  }





  downloadExcelTemplate(): void {
    this.excelService.generateExcel();
  }

  selectedFile: File | null = null;

  onFileChange(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  uploadExcel(): void {
    if (this.selectedFile) {
      this.excelService.readExcel(this.selectedFile).subscribe({
        next: (data) => {
          const patientData = this.extractPatientData(data);

          //API Call to add patient details
          this.addPatientFromExcelData(patientData);
        },
        error: (error) => {
          console.error('Error reading Excel file', error);
        },
      });
    }
  }

  extractPatientData(data: any[]): any {
    const headers = data[0];
    const patientRow = data[1];

    const patientData = {
      patientFirstName: String(patientRow[headers.indexOf('First Name')] || ''),
      patientLastName: String(patientRow[headers.indexOf('Last Name')] || ''),
      patientGender: String(patientRow[headers.indexOf('Gender')] || ''),
      patientStreetAddress: String(patientRow[headers.indexOf('Street Address')] || ''),
      patientCountry: String(patientRow[headers.indexOf('Country')] || ''),
      patientState: String(patientRow[headers.indexOf('State')] || ''),
      patientMobileNumber: String(patientRow[headers.indexOf('Mobile Number')] || ''),
    };

    return patientData;
  }

  addPatientFromExcelData(patientData: any) {
    this.patientService.addPatient(patientData).subscribe({
      next: (res) => {
        if (res.success) {
          this.toastr.success('Successfully!', res.message);
        } else {
          this.toastr.error(res.message);
        }
      },

      error: (error) => {
        if (error.error && error.error.message) {
          this.toastr.error(error.error.message, 'Error!');
        } else {
          this.toastr.error('An unexpected error occurred.', 'Error!');
        }
      },
    });
  }
}
