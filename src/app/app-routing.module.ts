import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SuratComponent } from './surat/surat.component';


const routes: Routes = [

  { path: 'surat', component: SuratComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
