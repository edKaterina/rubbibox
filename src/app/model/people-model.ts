export class peopleModel {
    key?: string;
    dateCreate: string;         // Дата создания
    category: string;           // Категория
    fio: string;                // Фамилия, имя, отчество
    title: string;              // Краткое описание
    description;                // Полное описание
    user;                       // код пользователя
    phone;                      // телефон мастера
    url;                        // ссылка на фото
    img: Array<string> = [];    // массив ссылкок на фото

    constructor() {
    }
}
