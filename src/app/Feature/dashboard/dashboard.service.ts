import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { Observable, of } from 'rxjs';
import { Person , DatesInformation , OrderDetails } from '../../Feature/dashboard/interrface/dashboard-interface';

@Injectable()
export class dashboardService {
    rows : Person[] = []
    DatesInformation : DatesInformation[] = []
    OrderDetails = new OrderDetails()
  
    constructor(private logger : NGXLogger) { 
      this.logger.info('logging')
      this.rows = [
        {
          'Order ID': '#1001',
          'Date': '2024-10-01',
          'Customer Name': 'Alice Johnson',
          'Description': 'Purchase of electronics',
          'Aggregator': 'Amazon',
          'Location': 'New York, NY',
          'Amount': 299.99,
          'Status Order': 'Confirmed',
          showDropDown : false
        },
        {
          'Order ID': '#1002',
          'Date': '2024-10-02',
          'Customer Name': 'Bob Smith',
          'Description': 'Monthly subscription',
          'Aggregator': 'Netflix',
          'Location': 'Los Angeles, CA',
          'Amount': 15.99,
          'Status Order': 'Pending',
          showDropDown : false
        },
        {
          'Order ID': '#1003',
          'Date': '2024-10-03',
          'Customer Name': 'Charlie Brown',
          'Description': 'Book purchase',
          'Aggregator': 'Barnes & Noble',
          'Location': 'Chicago, IL',
          'Amount': 24.99,
          'Status Order': 'Initiated',
          showDropDown : false
        },
        {
          'Order ID': '#1004',
          'Date': '2024-10-04',
          'Customer Name': 'Diana Prince',
          'Description': 'Clothing purchase',
          'Aggregator': 'Zara',
          'Location': 'Miami, FL',
          'Amount': 79.99,
          'Status Order': 'Dispatched',
          showDropDown : false
        },
        {
          'Order ID': '#1005',
          'Date': '2024-10-05',
          'Customer Name': 'Ethan Hunt',
          'Description': 'Grocery shopping',
          'Aggregator': 'Walmart',
          'Location': 'Houston, TX',
          'Amount': 45.00,
          'Status Order': 'Delivered',
          showDropDown : false
        },
        {
          'Order ID': '#1005',
          'Date': '2024-10-05',
          'Customer Name': 'Ethan Hunt',
          'Description': 'Grocery shopping',
          'Aggregator': 'Walmart',
          'Location': 'Houston, TX',
          'Amount': 45.00,
          'Status Order': 'Prepared',
          showDropDown : false
        },
        {
          'Order ID': '#1005',
          'Date': '2024-10-05',
          'Customer Name': 'Ethan Hunt',
          'Description': 'Grocery shopping',
          'Aggregator': 'Walmart',
          'Location': 'Houston, TX',
          'Amount': 45.00,
          'Status Order': 'Cancelled',
          showDropDown : false
        },
        {
          'Order ID': '#1005',
          'Date': '2024-10-05',
          'Customer Name': 'Ethan Hunt',
          'Description': 'Grocery shopping',
          'Aggregator': 'Walmart',
          'Location': 'Houston, TX',
          'Amount': 45.00,
          'Status Order': 'Cancelled',
          showDropDown : false
        },
        {
          'Order ID': '#1005',
          'Date': '2024-10-05',
          'Customer Name': 'Ethan Hunt',
          'Description': 'Grocery shopping',
          'Aggregator': 'Walmart',
          'Location': 'Houston, TX',
          'Amount': 45.00,
          'Status Order': 'Cancelled',
          showDropDown : false
        },
        {
          'Order ID': '#1005',
          'Date': '2024-10-05',
          'Customer Name': 'Ethan Hunt',
          'Description': 'Grocery shopping',
          'Aggregator': 'Walmart',
          'Location': 'Houston, TX',
          'Amount': 45.00,
          'Status Order': 'Cancelled',
          showDropDown : false
        },
        {
          'Order ID': '#1005',
          'Date': '2024-10-05',
          'Customer Name': 'Ethan Hunt',
          'Description': 'Grocery shopping',
          'Aggregator': 'Walmart',
          'Location': 'Houston, TX',
          'Amount': 45.00,
          'Status Order': 'Cancelled',
          showDropDown : false
        },
        {
          'Order ID': '#1005',
          'Date': '2024-10-05',
          'Customer Name': 'Ethan Hunt',
          'Description': 'Grocery shopping',
          'Aggregator': 'Walmart',
          'Location': 'Houston, TX',
          'Amount': 45.00,
          'Status Order': 'Cancelled',
          showDropDown : false
        },
        {
          'Order ID': '#1005',
          'Date': '2024-10-05',
          'Customer Name': 'Ethan Hunt',
          'Description': 'Grocery shopping',
          'Aggregator': 'Walmart',
          'Location': 'Houston, TX',
          'Amount': 45.00,
          'Status Order': 'Cancelled',
          showDropDown : false
        },
        {
          'Order ID': '#1005',
          'Date': '2024-10-05',
          'Customer Name': 'Ethan Hunt',
          'Description': 'Grocery shopping',
          'Aggregator': 'Walmart',
          'Location': 'Houston, TX',
          'Amount': 45.00,
          'Status Order': 'Cancelled',
          showDropDown : false
        },
        {
          'Order ID': '#1005',
          'Date': '2024-10-05',
          'Customer Name': 'Ethan Hunt',
          'Description': 'Grocery shopping',
          'Aggregator': 'Walmart',
          'Location': 'Houston, TX',
          'Amount': 45.00,
          'Status Order': 'Cancelled',
          showDropDown : false
        },
        {
          'Order ID': '#1005',
          'Date': '2024-10-05',
          'Customer Name': 'Ethan Hunt',
          'Description': 'Grocery shopping',
          'Aggregator': 'Walmart',
          'Location': 'Houston, TX',
          'Amount': 45.00,
          'Status Order': 'Cancelled',
          showDropDown : false
        },{
          'Order ID': '#1005',
          'Date': '2024-10-05',
          'Customer Name': 'Ethan Hunt',
          'Description': 'Grocery shopping',
          'Aggregator': 'Walmart',
          'Location': 'Houston, TX',
          'Amount': 45.00,
          'Status Order': 'Cancelled',
          showDropDown : false
        }
  
      ];
      this.DatesInformation = [
        { Date : '29-Aug-2024', Day : 'Monday', OrdersCount : 10 },
        { Date : '30-Aug-2024', Day : 'Tuesday', OrdersCount : 11 },
        { Date : '29-Aug-2024', Day : 'Wednesday', OrdersCount : 10 },
        { Date : '30-Aug-2024', Day : 'Thusday', OrdersCount : 12 },
        { Date : '29-Aug-2024', Day : 'Friday', OrdersCount : 15 },
        { Date : '30-Aug-2024', Day : 'Saturday', OrdersCount : 17 },
      ]
      this.OrderDetails.cancleOrder = 58;
      this.OrderDetails.completeOrder = 400;
      this.OrderDetails.pandingOrder = 200;
      this.OrderDetails.totalOrder  = 5000;
    }
    apiUrl = ''
    // For Getting Rows data for dashboard
    getData():Observable<Person[]>{
      // return this.http.get<any>(this.apiUrl);
      return of(this.rows);
    }
  
    getCalenderData():Observable<DatesInformation[]>{
      return of(this.DatesInformation);
    }
    getOrdersDetail():Observable<OrderDetails>{
      return of(this.OrderDetails)
    }
  }