import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth' , loadChildren : () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'patient' , loadChildren: ()=> import('./patient/patient.module').then(m=> m.PatientModule)
  },
  {
    path: 'shared', loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule)
  },
  {
    path: 'patient_Management' , loadChildren : () => import('./patient-management/patient-management.module').then(m => m.PatientManagementModule)
  },
  // {
  //   path: 'provider_Management' , loadChildren: () => import('./provider-management/provider-management.module').then(m => m.ProviderManagementModule)
  // },
  // {
  //   path: 'organization_Management', loadChildren: () => import('./organization-management/organization-management.module').then(m => m.OrganizationManagementModule)
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
