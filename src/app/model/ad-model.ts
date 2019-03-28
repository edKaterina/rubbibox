import { AdFields, TypeField } from './ad-fields';

export class AdModel {
    key?: string;
    dateCreate: string; // Дата создания
    category: string;   // Категория объявлений
    job: string;        // Объявление
    user: string;       // код пользователя

    constructor() {
    }

    // дополнительные кастомизированные поля
    public static getFileds(category: string): Array<AdFields> {
        if (category === 'Тестовая категория') {
            return [
                {
                    name: 'job',
                    label: 'Заголовок',
                    type: TypeField.input,
                    placeholder: 'Коротко о квартире',
                    required: true
                },
                {
                    name: 'description',
                    label: 'Описание',
                    type: TypeField.textarea,
                    rows: 6,
                    placeholder: 'Подробнее о квартире',
                    required: true
                },
                {
                    name: 'area',
                    label: 'Площадь',
                    type: TypeField.input,
                    placeholder: 'Общая площадь'
                }
            ];
        } else {
            return [
                {
                    name: 'job',
                    label: 'Описание',
                    type: TypeField.textarea,
                    rows: 6,
                    placeholder: 'Опишите подробно задачу',
                    required: true
                }
            ];
        }
    }
}
