import { FormGroup } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GridModule , PDFModule} from "@progress/kendo-angular-grid";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { LabelModule } from '@progress/kendo-angular-label';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    GridModule,
    HttpClientModule,
    LabelModule,
    ReactiveFormsModule,
    PDFModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
