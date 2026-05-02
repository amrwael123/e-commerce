    export interface ProductsType  {
    
    id : string,
    title : string,
    description : string,
    price : number,
    imageCover : string,
    ratingsAverage : string,
    images : string[],
    priceAfterDiscount : number,

    category : CategoryType ,
    brand : BrandType,
    }

    export interface CategoryType {
    id : string,
    name : string,
    slug : string,
    image : string,
    }

    export interface BrandType {
    id : string,
    name : string,
    slug : string,
    image : string,
    }
