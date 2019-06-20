import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferListPage } from './offer-list.page';

describe('OfferListPage', () => {
  let component: OfferListPage;
  let fixture: ComponentFixture<OfferListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
