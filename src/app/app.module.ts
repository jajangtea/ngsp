import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { UiModule } from './ui/ui.module';
import { HttpClientModule } from '@angular/common/http';
import { SuratComponent } from './sp_kp/surat/surat.component';
import { ViewComponent } from './sp_kp/view/view.component';

@NgModule({
  declarations: [
    AppComponent,
    SuratComponent,
    ViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatCardModule,
    UiModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
