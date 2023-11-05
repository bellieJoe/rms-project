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

export interface ImageUploadData{
    id: number
    image: string
}
