import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogListPage } from './dialog-list.page';

describe('DialogListPage', () => {
  let component: DialogListPage;
  let fixture: ComponentFixture<DialogListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
