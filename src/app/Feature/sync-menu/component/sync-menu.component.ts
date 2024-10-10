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
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxPaginationModule } from 'ngx-pagination';
import { LoaderComponent } from '../../../Shared/UI-Elements/loader/loader.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sync-menu',
  standalone: true,
  imports: [SaveButtonComponent,AppLoggerModule,CommonModule,ModleComponent,MatTableModule,MatPaginatorModule,NgxPaginationModule,LoaderComponent,FormsModule ],
  templateUrl: './sync-menu.component.html',
  styleUrl: './sync-menu.component.scss',
  providers : [syncMenuConstant,SyncMenuService,HttpClientModule]
})

export class SyncMenuComponent {
  
  constructor(private service : SyncMenuService , public constant : syncMenuConstant , private logger : NGXLogger){
    this.logger.info('Starts')
    this.columns = this.constant.columnData
    this.logger.info('Start Sync menu')
  }
  
  @ViewChild('appModle') appModel! : ModleComponent
  page : number = 1;
  loading : boolean = false;
  rows : menuRows[] = []
  columns : any;
  listOfMenus : SingleMenuRow[] = []
  title: string = '';
  context: string = '';
  currentRowdata : any;
  syncMessage:string = ''
  unsubscribe$ = new Subject<void>();
  lodinMenuModel : boolean = false;
  lodinSpinner : boolean = false
  dropDownSelectedValue : string = '5';

  ngOnInit(){
    this.loading = false;
    this.listOfMenus = []
    this.setPage(); // Fetch data
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
        // this.dataSource.data = this.rows; 
        this.loading = true;
      },
      error: (error : any) => {
        console.error(this.constant.fechingError, error);
      },
      complete: () => {
        console.log(this.constant.successfulDataFetched);
      }
    });
  }

  // Below function is use to get Menu Of Perticullar Restro
  openConfirmationPopup(row:any, title:string , context:string){
   if(row){
    this.currentRowdata = row;
    this.title = title ? title : ''
    this.context = context ? context : ''
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
      this.lodinSpinner = true
      this.service.syncData(this.currentRowdata.ShopCode,this.currentRowdata.Region).subscribe({
        next: (response : any) => {response
          this.syncMessage = 'Sync Data successfully'; 
          this.loading = true;
        },
        error: (error : any) => {
          console.error(this.constant.fechingError, error);
        },
        complete: () => {
          this.lodinSpinner = false
          this.title = 'Syncing Complete'
          this.context = 'Syncing Complete'
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

  onValueChange(){
    if (this.dropDownSelectedValue !== '5') {
      console.log('Selected value:', this.dropDownSelectedValue);
    }
  }
}
