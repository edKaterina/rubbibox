import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferAddEditPage } from './offer-add-edit.page';

describe('OfferAddEditPage', () => {
  let component: OfferAddEditPage;
  let fixture: ComponentFixture<OfferAddEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferAddEditPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferAddEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
