import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {OfferFilterModalPage} from '../offer-filter-modal/offer-filter-modal.page';

@Component({
    selector: 'app-offer-list',
    templateUrl: './offer-list.page.html',
    styleUrls: ['./offer-list.page.scss'],
})
export class OfferListPage implements OnInit {

    offerList = [
        {
            name: '2-к квартира, 42 м², 5/5 э. Очень длинное название для объявления',
            price: '1 600 000 ₽',
            imgUrl: '',
            dateCreate: 'Сегодня 11:33',
            category: 'Недвижимость'
        },
        {
            name: '1-к квартира, 34 м², 1/9 эт.',
            price: '1 600 000 ₽',
            imgUrl: 'https://18.img.avito.st/208x156/5615021418.jpg',
            dateCreate: 'Сегодня 11:33',
            category: 'Недвижимость'
        },
        {
            name: '3-к квартира, 67 м², 4/5 эт.',
            price: '1 600 000 ₽',
            imgUrl: 'https://61.img.avito.st/208x156/5365383661.jpg',
            dateCreate: 'Сегодня 11:33',
            category: 'Недвижимость'
        },
        {
            name: '1-к квартира, 48 м², 5/9 эт.',
            price: '1 600 000 ₽',
            imgUrl: 'https://91.img.avito.st/208x156/4830707291.jpg',
            dateCreate: 'Сегодня 11:33',
            category: 'Недвижимость'
        },

        {
            name: 'Жалюзи на заказ',
            price: '100 ₽',
            imgUrl: 'https://06.img.avito.st/208x156/5319330806.jpg',
            dateCreate: 'Сегодня 11:33',
            category: 'Услуги'
        },
        {
            name: 'Деревянные Дома и Бани от Производителя',
            price: '',
            imgUrl: 'https://13.img.avito.st/208x156/5495658913.jpg',
            dateCreate: 'Сегодня 11:33',
            category: 'Услуги'
        },
        {
            name: 'Бригада на стяжку полов',
            price: '11 000 ₽',
            imgUrl: '',
            dateCreate: 'Сегодня 11:33',
            category: 'Услуги'
        },

        {
            name: 'Peugeot 206, 2007',
            price: '170 000 ₽',
            imgUrl: 'https://41.img.avito.st/208x156/5731051541.jpg',
            dateCreate: 'Сегодня 11:33',
            category: 'Транспорт'
        },
        {
            name: 'Toyota Land Cruiser Prado, 2010',
            price: '1 550 000 ₽',
            imgUrl: 'https://05.img.avito.st/208x156/5705001605.jpg',
            dateCreate: 'Сегодня 11:33',
            category: 'Транспорт'
        },
        {
            name: 'Audi Q5, 2012',
            price: '1 250 000 ₽',
            imgUrl: 'https://79.img.avito.st/208x156/5280022479.jpg',
            dateCreate: 'Сегодня 11:33',
            category: 'Транспорт'
        },
    ];

    constructor(public modalController: ModalController) {
    }

    ngOnInit() {
    }


    onClickFilterModalOpen() {
        this.presentModal();
    }

    async presentModal() {

        const modal = await this.modalController.create({
            component: OfferFilterModalPage
        });

        return await modal.present();
    }

}
