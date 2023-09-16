import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { DataGridComponent } from './Components/data-grid/data-grid.component';
import { DropDownsModule } from "@progress/kendo-angular-dropdowns";
import { DialogModule } from "@progress/kendo-angular-dialog";
import { DateInputsModule } from "@progress/kendo-angular-dateinputs";
import { LabelModule } from "@progress/kendo-angular-label";
import { InputsModule } from "@progress/kendo-angular-inputs";
import { ButtonsModule } from "@progress/kendo-angular-buttons";
import { ReactiveFormsModule } from '@angular/forms';
import { ReadGridComponent } from './Components/read-grid/read-grid.component';
import { PDFModule } from "@progress/kendo-angular-grid";

@NgModule({
  declarations: [
    DataGridComponent,
    ReadGridComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    DropDownsModule,
    DialogModule,
    DateInputsModule,
    LabelModule,
    InputsModule,
    ButtonsModule,
    ReactiveFormsModule,
    PDFModule
  ]
})
export class MainModule { }
