import { Component } from '@angular/core';
import { menuRows, SingleMenuRow } from '../interface/sync-menu-interface';
import { SyncMenuService } from '../sync-menu.service';
import { syncMenuConstant } from '../cosnt/sync-menu.const';
import { AppLoggerModule } from '../../../Core/logger.module';
import { NGXLogger } from 'ngx-logger';
import { ColumnMode, NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Page } from '../../dashboard/interrface/dashboard-interface';
import { SaveButtonComponent } from '../../../Shared/UI-Elements/save-button/save-button/save-button.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ModleComponent } from '../../../Shared/popup/modle/modle.component';
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-sync-menu',
  standalone: true,
  imports: [NgxDatatableModule,SaveButtonComponent,AppLoggerModule,CommonModule,ModleComponent],
  templateUrl: './sync-menu.component.html',
  styleUrl: './sync-menu.component.scss',
  providers : [syncMenuConstant,SyncMenuService,NgxDatatableModule,HttpClientModule ]
})
export class SyncMenuComponent {
  constructor(private service : SyncMenuService , public constant : syncMenuConstant , private logger : NGXLogger){
    // this.logger.info('Starts')
    this.columns = this.constant.columnData
    this.page.pageNumber = 0;
    this.page.size = 5;
    this.logger.info('Start Sync menu')
  }
  purpose: string | undefined;
  loding : boolean = false;
  ColumnMode = ColumnMode;
  rows : menuRows[] = []
  columns : any;
  page = new Page();
  pagedRows: menuRows[] = [];
  loadingIndicator = true;
  reorderable = true;
  listOfMenus : SingleMenuRow[] = []
  showModel : boolean = false;
  title: string = '';
  context: string = '';
  currentRowdata : any;
  syncMessage:string = ''
  private unsubscribe$ = new Subject<void>();
  ngOnInit(){
    this.setPage()
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
 

  //Below function is use for configure pagination
  setPagination(pageInfo:any){
    this.page.pageNumber = pageInfo.offset;
    const start = this.page.pageNumber * this.page.size;
    const end = Math.min(start + this.page.size, this.rows.length);
    this.pagedRows = this.rows.slice(start, end);
    this.page.totalPages = Math.ceil(this.page.totalElements / this.page.size);
  }

  // Below function is Use for get and set Records
  setPage(){
    this.loadingIndicator = true; 
    this.service.getData().pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: (response : any) => {
        this.rows = response; 
        this.page.totalElements = this.rows.length;
        this.setPagination({ offset: 0 });
        this.loding = true;
      },
      error: (error : any) => {
        console.error('Error fetching data:', error);
      },
      complete: () => {
        console.log(this.constant.successfulDataFetched);
        this.loadingIndicator = false; 
      }
    });
  }

  // Below function is use to get Menu Of Perticullar Restro
  openConfirmationPopup(row:any, title:string , context:string , purpose: string){
   if(row){
    this.currentRowdata = row;
    this.showModel = true
    this.title = title ? title : ''
    this.context = context ? context : ''
    this.purpose = purpose;
   }
  }

  getMenuList(){
    let json = {};
    if(this.currentRowdata){
      json = {'ShopCode' : this.currentRowdata.ShopCode , 'Region' : this.currentRowdata.Region}
      this.service.getMenu(json).subscribe({
        next: (response : any) => {
          this.listOfMenus = response; 
          this.loding = true;
        },
        error: (error : any) => {
          console.error('Error fetching data:', error);
        },
        complete: () => {
          console.log(this.constant.successfulDataFetched);
        }
      });
    }
  }

  // when click on sync data it will syncing data

  syncingData(){
    if(this.currentRowdata){

      this.service.syncData(this.currentRowdata.ShopCode).subscribe({
        next: (response : any) => {
          this.syncMessage = response; 
          this.loding = true;
        },
        error: (error : any) => {
          console.error('Error fetching data:', error);
        },
        complete: () => {
          console.log(this.constant.successfulDataFetched);
        }
      });
    }
  }


  clickToSure(){
    switch (this.purpose) {
      case this.constant.GetMenu:
        this.getMenuList()
        break;
      case this.constant.SyncData:
        this.syncingData()
        break;
    }
  }
}
