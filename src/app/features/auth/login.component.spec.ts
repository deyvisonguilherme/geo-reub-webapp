import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../../core/auth/auth.service';
import { AuthStore } from '../../core/auth/auth.store';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let authStore: jasmine.SpyObj<AuthStore>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
    const authStoreSpy = jasmine.createSpyObj('AuthStore', ['setAuth']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [LoginComponent, NoopAnimationsModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: AuthStore, useValue: authStoreSpy },
        { provide: Router, useValue: routerSpy },
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    authStore = TestBed.inject(AuthStore) as jasmine.SpyObj<AuthStore>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call authService.login on onLogin', () => {
    authService.login.and.returnValue(of({ token: '123', user: {} as any }));
    component.username.set('test');
    component.password.set('123');
    component.onLogin();
    expect(authService.login).toHaveBeenCalled();
  });

  it('should show organization selection on MULTIPLE_ORGANIZATIONS error', () => {
    const errorResponse = {
      status: 400,
      error: {
        error: 'MULTIPLE_ORGANIZATIONS',
        organizations: [
          { id: '1', name: 'Org 1' },
          { id: '2', name: 'Org 2' }
        ]
      }
    };
    authService.login.and.returnValue(throwError(() => errorResponse));

    component.username.set('test');
    component.password.set('123');
    component.onLogin();

    expect(component.showOrgSelection()).toBeTrue();
    expect(component.organizations().length).toBe(2);
  });

  it('should call onLogin with organizacao_id on onConfirmOrganization', () => {
    authService.login.and.returnValue(of({ token: '123', user: {} as any }));
    
    component.username.set('test');
    component.password.set('123');
    component.selectedOrganization.set({ id: 'org-1', name: 'Org 1' });
    
    component.onConfirmOrganization();

    expect(authService.login).toHaveBeenCalledWith({
      username: 'test',
      password: '123',
      organizacao_id: 'org-1'
    });
  });
});
