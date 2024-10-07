import { Injectable, NgModule } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { Observable} from 'rxjs';
import { menuRows, SingleMenuRow } from './interface/sync-menu-interface';
import { HttpClient } from '@angular/common/http';
import { AppLoggerModule } from '../../Core/logger.module';

@Injectable({
    providedIn: 'root'
})
@NgModule({
    imports : [AppLoggerModule],
})
export class SyncMenuService  {
    rows : menuRows[] = []
    constructor(private logger : NGXLogger , private http:HttpClient) {
        this.logger.info('Starts')
    }

    apiUrl = 'http://localhost:3000'

    // For Getting Rows data for dashboard
    getData():Observable<menuRows[]>{
      return this.http.get<menuRows[]>(this.apiUrl + '/api/getListOfOutlets');
    }

    // For Getting Menu list of Perticuller Restro
    getMenu(json:any):Observable<SingleMenuRow[]>{
        const body = {"ShopCode": json.ShopCode,"Region": json.Region}
        return this.http.post<any>(this.apiUrl + '/api/getMenuForParticularOutlets', body) 
    }

    syncData(restroId?:any){
        const body = {id : restroId}
        return this.http.post<any>(this.apiUrl + '/api/syncData' , body)
    }

  }