import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaiterCategoryComponent } from './waiter-category.component';

describe('WaiterCategoryComponent', () => {
  let component: WaiterCategoryComponent;
  let fixture: ComponentFixture<WaiterCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WaiterCategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WaiterCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
