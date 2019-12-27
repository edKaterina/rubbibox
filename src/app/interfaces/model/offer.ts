export interface Offer {
    id?: string;
    data: {
        name: string,
        description: string,
        price: number,
        arImg?: string[],
        dateCreate: string,
        category: {
            name: string,
            childrenCategory: []
        },
        owner: string,
        city?: { city: string, region: string },
    };

}
