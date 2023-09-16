import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { getNow } from '@progress/kendo-angular-dateinputs/util';
import { AggregateDescriptor } from '@progress/kendo-data-query';
import { Master } from 'src/app/Models/MasterModel';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.css'],
})
export class DataGridComponent implements OnInit {
  constructor(private api: ApiService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.GetMasterData();
  }

  // Calculation Variables
  GlobalLoss: any = 0;
  GlobalFine: any = 0;
  FooterIssue: any = 0;
  FooterLoss: any = 0;
  FooterFine: any = 0;
  // Calculation Variables

  public gridData: Master[] = [];
  touchList: Number[] = [91.6, 83.5, 75.2];
  defaultTouch: Number = 91.6;

  DialogTitle: string = '';
  isEditing: boolean = false;
  shortFormat = 'dd/MM/yyyy';
  CurrentDate: Date = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate()
  );

  public decimals = 3;
  public value = 5;
  public format = 'n3';

  DataForm: FormGroup = new FormGroup({
    id: new FormControl(0, []),
    date: new FormControl('', []),
    fine: new FormControl(0, []),
    issue: new FormControl(0, []),
    loss: new FormControl(0, []),
    pick: new FormControl(0, []),
    touch: new FormControl(0, []),
    recieve: new FormControl(0, []),
  });

  // Grid Handler

  addHandler() {
    // alert('addHandler');
    this.DataForm.reset();
    this.isEditing = false;
    this.DialogTitle = 'Add New Record';
    this.open();
  }

  editHandler(dataItem: any) {
    // console.log('edit data');

    // console.log(dataItem);
    this.isEditing = true;
    this.DialogTitle = 'Edit Record';
    this.EditForm(dataItem.dataItem);
    this.open();
  }

  EditForm(data: any) {
    // console.log('Date of Edit Form');
    // console.log(data.date);

    let text = data.date;
    let date = parseInt(text.slice(0, 2));
    let month = parseInt(text.slice(3, 5));
    let ywear: number = parseInt(text.slice(6, 10));
    let final = new Date(ywear, month, date);

    this.DataForm.patchValue({
      id: data.id,
      date: new Date(final),
      fine: data.fine,
      issue: data.issue,
      loss: data.loss,
      pick: data.pick,
      touch: data.touch,
      recieve: data.recieve,
    });
  }

  removeHandler(dataItem: any) {
    alert('removeHandler');
    let data: Master = dataItem.dataItem;
    // Dummy Values For Api
    data.createdOn = new Date();
    data.isdeleted = false;
    // Dummy Values For Api
    this.api.RemoveMasterData(data).subscribe((res: any) => {
      // console.log(res);
      this.ReloadApis();
    });
  }

  // Data Access Methods

  GetMasterData() {
    this.api.GetMasterData().subscribe((res: any) => {
      console.log(res);
      this.gridData = res;

      // Reload Footer Apis Everytime Data is Changed
      this.FooterValues();
    });
  }

  /// Dialogs Method

  public opened = false;

  public close(): void {
    this.opened = false;
    this.isEditing = false;
    this.ResetValues(); // Reset Global Values
  }

  public open(): void {
    this.opened = true;
  }

  Submit() {
    let data: Master = this.DataForm.value;
    // Dummy Values For Api
    data.createdOn = new Date();
    data.isdeleted = false;
    // Dummy Values For Api

    // Assign Values To ReadOnly Fileds
    data.fine = this.GlobalFine;
    data.loss = this.GlobalLoss;

    // this.ResetValues(); // Reset Global Values

    if (this.isEditing) {
      alert('edit');
      this.api.EditMasterData(data).subscribe((res: any) => {
        // console.log(res);
        this.isEditing = false;
        this.ReloadApis();
        this.close();
      });
    } else {
      alert('Add');
      data.id = 7;

      this.api.AddMasterData(data).subscribe((res: any) => {
        // console.log(res);
        this.ReloadApis();
        this.close();
      });
    }
  }

  ReloadApis() {
    this.GetMasterData();
  }

  CalculateChange() {
    // alert("Fire");
    this.GlobalLoss =
      this.DataForm.get(['recieve'])?.value -
      this.DataForm.get(['issue'])?.value;
    this.GlobalFine = this.GlobalLoss * this.DataForm.get(['touch'])?.value;
  }

  DropDownChange() {
    // alert(1)
    this.defaultTouch = this.DataForm.get(['touch'])?.value;
    this.GlobalFine = this.GlobalLoss * this.DataForm.get(['touch'])?.value;
    this.GlobalLoss =
      this.DataForm.get(['recieve'])?.value -
      this.DataForm.get(['issue'])?.value;
  }

  ResetValues() {
    this.GlobalFine = 0;
    this.GlobalLoss = 0;
  }

  // Footer Values

  FooterValues() {
    let count = 0;
    this.gridData.forEach((ele) => {
      if (count == 0) {
        this.FooterIssue = ele.issue;
        this.FooterLoss = ele.loss;
        this.FooterFine = ele.fine;
      } else {
        this.FooterIssue = this.FooterIssue + ele.issue;
        this.FooterLoss = this.FooterLoss + ele.loss;
        this.FooterFine = this.FooterFine + ele.fine;
      }
      count++;
    });
  }
}
