import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductByDefaultComponent } from './product-by-default.component';

describe('ProductByDefaultComponent', () => {
  let component: ProductByDefaultComponent;
  let fixture: ComponentFixture<ProductByDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductByDefaultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductByDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
