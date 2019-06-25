export class User {
    id?: string;
    data: {
        fio?: string,
        img?: Array<string>,
        info?: string,
        phone: string,
    };

    constructor(id = '', {fio = '', img = [], info = '', phone = ''}) {
        this.id = id;
        this.data = {
            fio,
            img,
            info,
            phone
        }
    }
}
