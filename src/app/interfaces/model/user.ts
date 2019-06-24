export interface User {
    id?: string;
    data: {
        fio: string,
        img: Array<string>,
        info: string,
        phone: string,
    };
}
