export interface Product {
    id: string,
    name: string
    quantity: number,
    supermarket: string,
    notes: string
}

export interface NewProduct {
    name: string
    quantity: number,
    supermarket: string,
    notes: string
}