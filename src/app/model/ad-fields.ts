export enum TypeField {
    input,      // тип ion-input
    textarea,   // тип ion-textarea
    select      // тип ion-select
}

export class AdFields {
    name: string;        // индентификатор поля
    label: string;       // наименование поля для пользователя
    type: TypeField;     // тип поля
    rows?: number;        // кол-во строк в textarea
    placeholder?: string; // подсказка при вводе поля
    required?: boolean;   // обязательность заполнения поля
    values?: Array<string>;  // элменты чекбокса
    multiple?: boolean;      // множественный выбор в списках
    typeInput?: string;      // тип вводимой информации
}
