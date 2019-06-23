export interface Offer {
    id?: string;
    data: {
        name: string,
        price: number,
        imgUrl: string,
        dateCreate: Date,
        category: String
    };
}
