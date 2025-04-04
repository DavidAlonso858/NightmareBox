import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeliculaComponent } from './pelicula.component';

describe('PeliculaComponent', () => {
  let component: PeliculaComponent;
  let fixture: ComponentFixture<PeliculaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeliculaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeliculaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
