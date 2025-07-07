import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCreateEditComponent } from './order-create-edit.component';

describe('OrderCreateEditComponent', () => {
  let component: OrderCreateEditComponent;
  let fixture: ComponentFixture<OrderCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderCreateEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
