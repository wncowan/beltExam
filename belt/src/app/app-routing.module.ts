import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewComponent } from  './new/new.component';
import { EditComponent } from './edit/edit.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'pets'},
  { path: 'pets', component: HomeComponent},
  { path: 'pets/new', component: NewComponent },
  { path: 'pets/edit/:id', component: EditComponent},
  { path: 'pets/details/:id', component: DetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }