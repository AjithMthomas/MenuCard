export interface IProduct {
    id: number 
    name: string;
    price: number;
    image: string;
}

export interface IProductFull{
    id: number;
    created_by_user_id: number;
    name: string;
    price: number;
    category_id : number;
    description?: string;
    image?: string;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
    is_deleted?: boolean;
}


export interface ICategory {
    id: number;
    created_by_user_id: number;
    name: string;
    description?: string;
    image?: string;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
    is_deleted?: boolean;
}

export interface IPortionData{
    id?: number;
    name : string; 
    price : number;
    stock_available: boolean;
    editMode?: boolean;
    priceEdit? : number;
}

export interface CaptainDetail {
    mail : string;
    id : number;
    image_url : string;
    name : string;
    qr_code : string;
    username : string;
    location : string;
    total_category: number; 
    total_product : number;
}
