export class syncMenuConstant {
    successfulDataFetched = 'Data fetching completed';
    SyncData =  'SyncData';
    GetMenu = 'GetMenu';
    confirmation = 'For Confirmation'
    syncDataMessage = 'Are you sure , you want to sync data'
    getMenuListMessage = 'Are you sure , you want to see menu Data'
    columnData = [
        { prop: 'Sr No.', name: 'Sr No.' , sortable : false },
        { prop: 'Resturant Name', name: 'Resturant Name', sortable : false },
        { prop: 'Location', name: 'Location'},
        { prop: 'City', name: 'City' , sortable : false},
        { prop: 'Status', name: 'Status', sortable : false },
        { prop: 'Menu', name: 'Menu', sortable : false },
        { prop: 'Sync', name: 'Sync', sortable : false }
    ];


}