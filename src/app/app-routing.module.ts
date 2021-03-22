import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CountriesComponent} from './countries/countries.component'
import { CountryDetailsComponent } from './country-details/country-details.component';
import { NotFoundComponent } from './not-found/not-found.component';
const routes: Routes = [
  { path: 'countries', component: CountriesComponent},
  { path: '', redirectTo: '/countries', pathMatch: 'full'},
  { path: 'countries/:code', component: CountryDetailsComponent},
  { path: '**', component:  NotFoundComponent },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
