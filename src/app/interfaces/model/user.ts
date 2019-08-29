export class User {
    id?: string;
    data: {
        fio?: string,
        img?: Array<string>,
        info?: string,
        phone: string,
        permissionCall: boolean,
    };

    constructor(id = '', {fio = '', img = [], info = '', phone = '', permissionCall = false}) {
        this.id = id;
        this.data = {
            fio,
            img,
            info,
            phone,
            permissionCall,
        };
    }
}
