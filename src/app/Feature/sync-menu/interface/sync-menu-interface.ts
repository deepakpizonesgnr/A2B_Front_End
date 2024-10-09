export interface menuRows {
    Add1: string
    Add2 : string
    ContactNo: string
    Costcenter: string
    CountryCode: string
    CountryName: string
    GstNo: string
    Latitude: number
    Pincode: string
    Region: string
    ShopCode:string
    ShopName: string
    StateName: string
    add3: string
    longitude: number
}


export interface SingleMenuRow {
    StatusResponse: string,
    ExtPlatform: string,
    State: string
    Region: string
    Brcode: number,
    Branch: string
    MainCategorySortOrder: number,
    MainCategoryId: string
    MainCategoryName: string
    CategorySortOrder: 1,
    CategoryId: string
    CategoryName: string
    Icode: 1,
    Iname: string
    Uom: string
    RateWithoutTax: number,
    GST: number,
    OptionSaleYN: string
    LiveStatus: string
    Included_platforms: string
    WebItmDescription: string
    Recommended: string
    OptionGroupName: string
    ItemImage: string
    IndWeight: number,
    CountryCode: string,
    CountryName: string
}
