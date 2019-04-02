import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(url) {
    return browser.get(url);
  }

  getPageTitle() {
    return element(by.css('ion-title')).getText();
  }
}
