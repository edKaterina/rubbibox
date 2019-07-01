export interface Offer {
    id?: string;
    data: {
        name: string,
        description: string,
        price: number,
        arImg?: string[],
        dateCreate: string,
        category: String,
        owner: string,
        city?: string,
    };
}
