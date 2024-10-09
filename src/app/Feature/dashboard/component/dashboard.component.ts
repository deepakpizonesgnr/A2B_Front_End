import { Component, ViewChild } from '@angular/core';
import { AppLoggerModule } from '../../../Core/logger.module';
import { NGXLogger } from 'ngx-logger';
import { Person , DatesInformation , Page , OrderDetails } from '../interrface/dashboard-interface';
import { dashboardConstant } from '../const/dashboard-const';
import { dashboardService } from '../dashboard.service';
import { SaveButtonComponent } from '../../../Shared/UI-Elements/save-button/save-button/save-button.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AppLoggerModule,SaveButtonComponent,MatTableModule, MatPaginatorModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  providers : [dashboardService,dashboardConstant]
})

export class DashboardComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  loding = false;
  rows: Person[] = [];
  pagedRows: Person[] = [];
  reorderable = true;
  page = new Page();
  datesArray : DatesInformation[] = []
  OrderDetails  = new OrderDetails()
  columns : any;
  showDropDown:boolean = false;
  dataSource = new MatTableDataSource<Person>(this.rows);
  constructor(private logger : NGXLogger,private service : dashboardService , private constant : dashboardConstant){
    this.logger.info('started')
    this.page.pageNumber = 0;
    this.page.size = 5;
    this.columns = this.constant.columnData
  }
  ngOnInit() {
    this.getOrderDetails()
    this.getCalenderData();
    this.setPage();
    this.dataSource.paginator = this.paginator;
  }

  // Below function is Use for get and set Records
  setPage(){
    this.service.getData().subscribe({
      next: (response : any) => {
        this.rows = response; 
      },
      error: (error : any) => {
        console.error('Error fetching data:', error);
      },
      complete: () => {
        this.loding = true;
        this.logger.info(this.constant.successfulDataFetched);
      }
    });
  }

  // Below function is Use for get and set Calander Data
  getCalenderData(){
    this.service.getCalenderData().subscribe({
      next: (response : any) => {
        this.datesArray = response; 
      },
      error: (error : any) => {
        console.error('Error fetching in calender data:', error);
      },
      complete: () => {
        console.log(this.constant.successfulDataFetched);
      }
    });
  }

  // Below function is Use for get and set intial order details
  getOrderDetails(){
    this.service.getOrdersDetail().subscribe({
      next: (response : any) => {
        this.OrderDetails = response; 
      },
      error: (error : any) => {
        console.error('Error fetching in OrderDetail data:', error);
      },
      complete: () => {
        this.logger.info(this.constant.successfulDataFetched);
      }
    });
  }
  //Below function is use for configure pagination
  setPagination(pageInfo:any){
    this.page.pageNumber = pageInfo.offset;
    const start = this.page.pageNumber * this.page.size;
    const end = Math.min(start + this.page.size, this.rows.length);
    this.pagedRows = this.rows.slice(start, end);
    this.page.totalPages = Math.ceil(this.page.totalElements / this.page.size);
  }

  // When click on Drop down below function is called
  OpenDropDown(rowIndex?:number){
    if(rowIndex != null && rowIndex != undefined){
      this.rows = this.rows.map(item => {
        return { ...item, showDropDown: false };
      });
      this.pagedRows = this.pagedRows.map(item => {
        return { ...item, showDropDown: false };
      });
      this.rows[rowIndex].showDropDown = !this.rows[rowIndex].showDropDown
      this.pagedRows[rowIndex].showDropDown = !this.pagedRows[rowIndex].showDropDown 
    }
  }
}
