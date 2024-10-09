import { Component, ViewChild } from '@angular/core';
import { menuRows, SingleMenuRow } from '../interface/sync-menu-interface';
import { SyncMenuService } from '../sync-menu.service';
import { syncMenuConstant } from '../cosnt/sync-menu.const';
import { AppLoggerModule } from '../../../Core/logger.module';
import { NGXLogger } from 'ngx-logger';
import { SaveButtonComponent } from '../../../Shared/UI-Elements/save-button/save-button/save-button.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ModleComponent } from '../../../Shared/popup/modle/modle.component';
import { Subject, takeUntil } from 'rxjs';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-sync-menu',
  standalone: true,
  imports: [SaveButtonComponent,AppLoggerModule,CommonModule,ModleComponent,MatTableModule, MatPaginatorModule],
  templateUrl: './sync-menu.component.html',
  styleUrl: './sync-menu.component.scss',
  providers : [syncMenuConstant,SyncMenuService,HttpClientModule ]
})

export class SyncMenuComponent {
  
  constructor(private service : SyncMenuService , public constant : syncMenuConstant , private logger : NGXLogger){
    this.logger.info('Starts')
    this.columns = this.constant.columnData
    this.logger.info('Start Sync menu')
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  purpose: string | undefined;
  loding : boolean = false;
  rows : menuRows[] = []
  columns : any;
  pagedRows: menuRows[] = [];
  reorderable = true;
  listOfMenus : SingleMenuRow[] = []
  title: string = '';
  context: string = '';
  currentRowdata : any;
  syncMessage:string = ''
  private unsubscribe$ = new Subject<void>();
  lodinMenuModel : boolean = false;
  dataSource = new MatTableDataSource<menuRows>(this.rows);

  ngOnInit(){
    this.loding = false;
    this.listOfMenus = []
    this.setPage()
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
 

  // Below function is Use for get and set Records
  setPage(){
    this.service.getData().pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: (response : any) => {
        this.rows = response.data; 
      },
      error: (error : any) => {
        console.error(this.constant.fechingError, error);
      },
      complete: () => {
        console.log(this.constant.successfulDataFetched);
        this.loding = true;
      }
    });
  }

  // Below function is use to get Menu Of Perticullar Restro
  openConfirmationPopup(row:any, title:string , context:string , purpose: string){
   if(row){
    this.currentRowdata = row;
    this.title = title ? title : ''
    this.context = context ? context : ''
    this.purpose = purpose;
   }
  }

  getMenuList(currentRow?:menuRows){
    let json = {};
    this.lodinMenuModel = false;
    if(this.listOfMenus.length == 0 && currentRow){
      json = {'ShopCode' : currentRow.ShopCode , 'Region' : currentRow.Region}
      this.service.getMenu(json).subscribe({
        next: (response : any) => {
          this.listOfMenus = response; 
        },
        error: (error : any) => {
          console.error(this.constant.fechingError, error);
        },
        complete: () => {
          this.lodinMenuModel = true;
          console.log(this.constant.successfulDataFetched);
        }
      });
    }
  }

  // when click on sync data it will syncing data
  syncingData(){
    if(this.currentRowdata){
      this.service.syncData(this.currentRowdata.ShopCode,this.currentRowdata.Region).subscribe({
        next: (response : any) => {
          this.syncMessage = response; 
          this.loding = true;
        },
        error: (error : any) => {
          console.error(this.constant.fechingError, error);
        },
        complete: () => {
          console.log(this.constant.successfulDataFetched);
        }
      });
    }
  }

  cancleMenuModel(){
    this.listOfMenus = []
  }

  clickToSure(){
    this.syncingData()
  }
}
