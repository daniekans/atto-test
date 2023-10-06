import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './feature/components/components/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/agricultores', pathMatch: 'full' },
  {
    path: 'agricultores',
    component: HomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
