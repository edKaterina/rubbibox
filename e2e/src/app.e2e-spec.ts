import { AppPage } from './app.po';

describe('RTPlatform', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('запуск вкладки \"Мои объявления\"', () => {
    page.navigateTo('/');
    expect(page.getPageTitle()).toContain('Мои объявления');
  });

  it('запуск вкладки \"Все объявления\"', () => {
    page.navigateTo('/tabs/allAd');
    expect(page.getPageTitle()).toContain('Все объявления');
  });

  it('запуск вкладки \"Мастера\"', () => {
    page.navigateTo('/tabs/people');
    expect(page.getPageTitle()).toContain('Мастера');
  });

  it('запуск вкладки \"Настройки\"', () => {
    page.navigateTo('/tabs/setting');
    expect(page.getPageTitle()).toContain('Настройки');
  });

});
