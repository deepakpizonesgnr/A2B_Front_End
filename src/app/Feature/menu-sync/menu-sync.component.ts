// import {  Component } from '@angular/core';
// import { NGXLogger } from 'ngx-logger';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppLoggerModule } from '../../Core/logger.module';

import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';



export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}

const FRUITS: string[] = [
  'blueberry',
  'lychee',
  'kiwi',
  'mango',
  'peach',
  'lime',
  'pomegranate',
  'pineapple',
];
const NAMES: string[] = [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Jack',
  'Charlotte',
  'Theodore',
  'Isla',
  'Oliver',
  'Isabella',
  'Jasper',
  'Cora',
  'Levi',
  'Violet',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth',
];
@Component({
  selector: 'app-menu-sync',
  standalone: true,
  imports: [AppLoggerModule, FormsModule, CommonModule,MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule],
  templateUrl: './menu-sync.component.html',
  styleUrl: './menu-sync.component.scss'
})
export class MenuSyncComponent implements AfterViewInit{

  displayedColumns: string[] = ['id', 'name', 'progress', 'fruit'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    // Create 100 users
    const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
}

function createNewUser(id: number): UserData {
  const name =
    NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
    ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
    '.';

  return {
    id: id.toString(),
    name: name,
    progress: Math.round(Math.random() * 100).toString(),
    fruit: FRUITS[Math.round(Math.random() * (FRUITS.length - 1))],
  };
}

  // searchQuery: string = '';
  // selectedFilter: string = 'all';
  // visible: boolean = false;
  // title: string = '';
  // message: string = '';
  // status: string = '';
  // syncData: boolean = false;
 
  // // Modal state
  // modalVisible: boolean = false;
 
  // // Define columns with custom headers
  // columns = [
  //   { prop: 'sr no.', name: 'Sr No.' },
  //   { prop: 'restaurantName', name: 'Restaurant Name' },
  //   { prop: 'status', name: 'Status' },
  //   { prop: 'viewMenu', name: 'View Menu' },
  //   { prop: 'sync', name: 'Sync' }
  // ];
 
  // rows = [
  //   { sr: 1, restaurantName: 'John’s Diner', status: 'pending', viewMenu: 'Link1', sync: true },
  //   { sr: 2, restaurantName: 'Jane’s Café', status: 'Canel', viewMenu: 'Link2', sync: false },
  //   { sr: 3, restaurantName: 'Michael’s Grill', status: 'Done', viewMenu: 'Link3', sync: true }
  // ];
 
  // // In the parent.component.ts
  // menuList: any = {
  //   appetizers: [
  //     { name: 'Spring Rolls', image: 'path/to/image.jpg', description: 'Crispy rolls filled with veggies.', price: 5, syncD: true },
  //     { name: 'Garlic Bread', image: 'path/to/image.jpg', description: 'Toasted bread with garlic butter.', price: 4, syncD: false },
  //   ],
  //   breakfast: [
  //     { name: 'Pancakes', image: 'path/to/image.jpg', description: 'Fluffy pancakes served with syrup.', price: 7, syncD: false },
  //     { name: 'Omelette', image: 'path/to/image.jpg', description: 'Egg omelette with veggies.', price: 6, syncD: true },
  //   ],
  //   mainMenu: [
  //     { name: 'Grilled Chicken', image: 'path/to/image.jpg', description: 'Juicy grilled chicken with herbs.', price: 12, syncD: true },
  //     { name: 'Vegetable Stir Fry', image: 'path/to/image.jpg', description: 'Mixed vegetables stir-fried in soy sauce.', price: 10, syncD: false },
  //   ],
  //   dessert: [
  //     { name: 'Chocolate Cake', image: 'path/to/image.jpg', description: 'Rich chocolate cake with frosting.', price: 5, syncD: true },
  //     { name: 'Ice Cream', image: 'path/to/image.jpg', description: 'Vanilla ice cream topped with syrup.', price: 3, syncD: false },
  //   ],
  //   beverages: [
  //     { name: 'Coffee', image: 'path/to/image.jpg', description: 'Freshly brewed coffee.', price: 2, syncD: true },
  //     { name: 'Smoothie', image: 'path/to/image.jpg', description: 'Fruit smoothie made with fresh fruits.', price: 4, syncD: false },
  //   ],
  // };
 
 
  // filters = ['All', 'Option 1', 'Option 2', 'Option 3'];
  // constructor(private logger: NGXLogger, private cdr: ChangeDetectorRef) {
  //   this.logger.info('this is information')
  //   this.updatePagination();
  // }
 
  // ngOnInit() {
  //   // Any initialization logic
  // }
 
  // // Pagination properties
  // pageSize = 3;  // Number of rows per page
  // currentPage = 0;  // Current page index
  // paginatedRows = [...this.rows];  // Data to be displayed based on pagination
 
  // // Method to handle page change
  // onPageChange(event: any) {
  //   this.currentPage = event.offset; // ngx-datatable is 0-indexed
  // }
 
  // // In parent.component.ts
  // getMenuCategories() {
  //   return [
  //     { title: 'Appetizers/Starters', items: this.menuList.appetizers },
  //     { title: 'Breakfast', items: this.menuList.breakfast },
  //     { title: 'Main Menu (Lunch/Dinner)', items: this.menuList.mainMenu },
  //     { title: 'Dessert', items: this.menuList.dessert },
  //     { title: 'Beverages', items: this.menuList.beverages },
  //   ];
  // }
 
  // filteredRows = [...this.rows]; // Keep a copy of the original rows
 
  // onSearch(query: any) {
  //   if (query) {
  //     this.filteredRows = this.rows.filter(row =>
  //       row.restaurantName.toLowerCase().includes(query.toLowerCase())
  //     );
  //   } else {
  //     this.filteredRows = [...this.rows]; // Reset to original rows
  //   }
  // }
 
  // // Function to update pagination
  // updatePagination() {
  //   const start = this.currentPage * this.pageSize;
  //   const end = start + this.pageSize;
  //   this.paginatedRows = this.rows.slice(start, end);
  // }
 
 
  // close() {
  //   this.modalVisible = false; // Close the modal
  //   this.cdr.detectChanges();
  // }
 
  // // Click handler for View Menu button
  // onViewMenuClicked() {
  //   this.modalVisible = true;
  //   this.cdr.detectChanges();
  // }
 
  // // Click handler for Sync button
  // onSyncClicked() {
  //   this.modalVisible = true;
  //   this.cdr.detectChanges();
  // }
  // trackByCategory(index: number, category: any): string {
  //   index;
  //   return category.title; // Unique identifier for the category
  // }
 
  // trackByFood(index: number, food: any): string {
  //   index;
  //   return food.name; // Unique identifier for the food item
  // }
// }
