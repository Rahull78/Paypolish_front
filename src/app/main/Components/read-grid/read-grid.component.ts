import { Component } from '@angular/core';
import { DateModle } from 'src/app/Models/DateModel';
import { Master } from 'src/app/Models/MasterModel';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-read-grid',
  templateUrl: './read-grid.component.html',
  styleUrls: ['./read-grid.component.css'],
})
export class ReadGridComponent {
  constructor(private api: ApiService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.GetMasterData();
    // this.MonthFilter();
  }

  public gridData: Master[] = [];

  // Calculation Variables
  FooterIssue: any = 0;
  FooterLoss: any = 0;
  FooterFine: any = 0;
  // Calculation Variables

  // Data Acesss Methods

  GetMasterData() {
    this.api.GetMasterData().subscribe((res: any) => {
      console.log(res);
      this.gridData = res;

      // Reload Footer Apis Everytime Data is Changed
      this.FooterValues();
    });
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

  DateFilter(event: any) {
    console.log(event.dataItem);
    let text = event.dataItem.date;
    console.log(text);
    // let date = parseInt(text.slice(0, 2));
    // console.log(date)
    // let month = parseInt(text.slice(3, 5));
    // let ywear: number = parseInt(text.slice(6, 10));

    // let final = new Date(ywear, month, date);

    // console.log("Final Value");
    // console.log(final);

    let Body: DateModle = {
      Current: event.dataItem.date.toString(),
      Previous: new Date().toString(),
    };

    this.api.FilterByDateMasterData(Body).subscribe((res: any) => {
      console.log(res);
      this.gridData = res;
    });
  }

  MonthFilter() {
    let CurrentDate: Date = new Date();

    // Logic For Previous Date
    let year  = new Date().getFullYear();
    let month = new Date().getMonth() - 1;
    let date = new Date().getDate();

    if(month == 0){
        month = 12;
        year = year - 1;
    };

    let final = new Date(year,month,date);

    let Body: DateModle = {
      Current: CurrentDate.toDateString().toString(),
      Previous: final.toDateString().toString(),
    };

    console.log(Body);

    this.api.FilterMasterData(Body).subscribe((res:any)=>{
      console.log(res);
      this.gridData = res;
      // Reload Footer Apis Everytime Data is Changed
      this.FooterValues();
    });
  }
}
