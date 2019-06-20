import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-offer-detail',
    templateUrl: './offer-detail.page.html',
    styleUrls: ['./offer-detail.page.scss'],
})
export class OfferDetailPage implements OnInit {


    detailInfo =
        {
            uid: '123',
            name: '2-к квартира, 42 м², 5/5 э. Очень длинное название для объявления',
            price: '1 600 000 ₽',
            // не Больше 5 картинок
            arImg: [
                'https://21.img.avito.st/640x480/3323009121.jpg',
                'https://13.img.avito.st/640x480/5612505913.jpg',
                'http://kvartira154.ru/wp-content/uploads/2016/10/bez-imeni-3.jpg',
                'http://kvartira154.ru/wp-content/uploads/2016/09/20160903_143424.jpg',
                'http://kvartira154.ru/wp-content/uploads/2016/10/bez-imeni-131.jpg'
            ],
            dateCreate: 'Сегодня 11:33',
            category: 'Недвижимость'
        };

    constructor() {
    }

    ngOnInit() {
    }

}
