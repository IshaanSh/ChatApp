import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SanckbarComponent } from './sanckbar.component';

describe('SanckbarComponent', () => {
  let component: SanckbarComponent;
  let fixture: ComponentFixture<SanckbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SanckbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SanckbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
