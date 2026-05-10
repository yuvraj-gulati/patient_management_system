// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class OrganizationService {
//   constructor(private httpclient: HttpClient) {}
//   url: string = 'app/organization-management/json/organizationData.json';

//   baseUrl : string = 'https://localhost:44317/api/Organization';



//   addOrganization(organizationDto: any): Observable<any> {
//     return this.httpclient.post<any>(`${this.baseUrl}/AddOrganization`, organizationDto);
//   }

  
  
//   getAllOrganization() : Observable<any> {
//     return this.httpclient.get<any[]>(`${this.baseUrl}/GetOrganizationsWithAddresses`);
//   }


//   toggleOrganizationIsActive(id: number): Observable<any> {
//     return this.httpclient.post(`${this.baseUrl}/ToggleOrganizationIsActive/${id}`, {});
//   }
  
// }
