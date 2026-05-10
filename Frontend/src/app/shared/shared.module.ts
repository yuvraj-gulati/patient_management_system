import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { HeaderComponent } from './header/header.component';
import { ProfileComponent } from './profile/profile.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PhoneFormatPipe } from './profile/phone-format.pipe';
import { FaxNumberFormatPipe } from './pipes/fax-number-format.pipe';


@NgModule({
  declarations: [
    HeaderComponent,
    ProfileComponent,
    SidebarComponent,
    PhoneFormatPipe,
    FaxNumberFormatPipe,
  ],
  imports: [CommonModule, SharedRoutingModule],
  exports: [
    HeaderComponent,
    ProfileComponent,
    SidebarComponent,
    PhoneFormatPipe,
    FaxNumberFormatPipe
  ],
  providers: [],
})
export class SharedModule {}
