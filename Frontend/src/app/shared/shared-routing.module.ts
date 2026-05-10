import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from '../guards/auth-guard.guard';
import { DashboardComponent } from '../patient/dashboard/dashboard.component';

const routes: Routes = [
  {
    path : 'profile' , component : ProfileComponent , canActivate: [AuthGuard]
  },
  {
    path: 'dashboard' , component: DashboardComponent , canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class SharedRoutingModule { }
