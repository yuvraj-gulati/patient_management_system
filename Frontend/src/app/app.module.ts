import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { PatientModule } from './patient/patient.module';
import { PatientManagementModule } from './patient-management/patient-management.module';
// import { ProviderManagementModule } from './provider-management/provider-management.module';
// import { OrganizationManagementModule } from './organization-management/organization-management.module';
import { SharedModule } from './shared/shared.module';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule } from 'ngx-ui-loader';



@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    AuthModule,
    PatientModule,
    PatientManagementModule,
    // ProviderManagementModule,
    
    SharedModule,
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule.forRoot({ showForeground: true })
  ],
  exports: [],
  providers: [
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
