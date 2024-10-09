  export interface Person {
    'Order ID': string ,
     'Date':string ,
     'Customer Name': string,
     'Description':string ,
     'Aggregator':string ,
     'Location': string,
     'Amount': number,
     'Status Order' : string,
     showDropDown:boolean;
  };
  export interface DatesInformation{
    Date : string , 
    Day : string,
    OrdersCount:number;
    
  };
  export class Page {
    size: number = 0;
    totalElements: number = 0;
    totalPages: number = 0;
    pageNumber: number = 0;
  }

  export class OrderDetails{
    pandingOrder : number = 0 ;
    completeOrder : number = 0 ;
    cancleOrder : number = 0 ;
    totalOrder : number = 0
  }