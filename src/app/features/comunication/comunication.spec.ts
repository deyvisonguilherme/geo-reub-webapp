import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComunicationComponent } from './comunication.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ComunicationComponent', () => {
  let component: ComunicationComponent;
  let fixture: ComponentFixture<ComunicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComunicationComponent, NoopAnimationsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComunicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
