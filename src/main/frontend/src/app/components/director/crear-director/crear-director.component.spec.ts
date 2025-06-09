import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearDirectorComponent } from './crear-director.component';

describe('CrearDirectorComponent', () => {
  let component: CrearDirectorComponent;
  let fixture: ComponentFixture<CrearDirectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearDirectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearDirectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
