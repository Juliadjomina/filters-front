import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersDashboardComponent } from './filters-dashboard.component';

describe('FiltersDashboardComponent', () => {
  let component: FiltersDashboardComponent;
  let fixture: ComponentFixture<FiltersDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltersDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltersDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
