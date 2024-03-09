import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriteriaRowComponent } from './criteria-row.component';

describe('CriteriaRowComponent', () => {
  let component: CriteriaRowComponent;
  let fixture: ComponentFixture<CriteriaRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriteriaRowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriteriaRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
