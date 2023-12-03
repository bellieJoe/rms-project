
export interface AddUserData{
    name: string
    contactNumber: string
    email: string
    password: string
}

export interface AddProductCategoryData{
    name: string
    description: string
}

export interface UpdateProductCategoryData{
    id: number
    name: string
    description: string
}

export interface AddProductItemData{
    name: string
    description: string
    product_category: number
}

export interface UpdateProductItemData{
    id: number
    name: string
    description: string
    product_category: number
}

export interface AddProductVariantData{
    name: string
    description: string
    price: number
    product_item_id : number
    image : string
}

export interface UpdateProductVariantData{
    name: string
    description: string
    price: number
    id : number
    image : string
}

export interface ImageUploadData{
    id: number
    image: string
}

export interface AddToCartData{
    quantity: number
    variant: any
    product_item : any
}

export interface PlaceOrderData{
    items : AddToCartData[]
    table_no: number
    notes? : string
    user_id : number
    delivery_type_id? : number
}

export interface FetchOrdersData{
    order_id? : number
    status : number
    start_date? : string
    end_date? : string
    page? : number
}

export interface AddSupplyItemData {
    name : string
    critical_level : number
    specifications : string
}

export interface EditSupplyItemData {
    id: number
    name : string
    critical_level : number
    specifications : string
}

export interface AddSUpplyStocksData {
    supply_item_id: number
    stock_amount : number
    expiration_date? : string
    batch_no : string
}