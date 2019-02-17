import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SuratComponent } from './sp_kp/surat/surat.component';
import { ViewComponent } from './sp_kp/view/view.component';



const routes: Routes = [

  { path: 'surat', component: SuratComponent },
  { path: 'view/:id', component: ViewComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
