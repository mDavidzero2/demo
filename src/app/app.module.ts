import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { PipePipe } from './pipe/pipe.pipe';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPrintModule } from 'ngx-print';

@NgModule({
  declarations: [
    AppComponent,HomeComponent,PipePipe],
  imports: [
    BrowserModule,
    NgSelectModule,
    NgxPrintModule,
    MatSelectModule,
    FormsModule,
    RouterModule,
    RouterModule.forRoot([]),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
