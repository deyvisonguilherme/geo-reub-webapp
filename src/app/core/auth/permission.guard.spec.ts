import { TestBed } from '@angular/core/testing';
import { Router, UrlTree } from '@angular/router';
import { permissionGuard } from './permission.guard';
import { AuthStore } from './auth.store';
import { GlobalFeedbackService } from '../feedback/global-feedback.service';
import { signal } from '@angular/core';

describe('permissionGuard', () => {
  let authStoreSpy: jasmine.SpyObj<AuthStore>;
  let routerSpy: jasmine.SpyObj<Router>;
  let feedbackSpy: jasmine.SpyObj<GlobalFeedbackService>;

  beforeEach(() => {
    authStoreSpy = jasmine.createSpyObj('AuthStore', ['isAuthenticated', 'isAdmin', 'user']);
    routerSpy = jasmine.createSpyObj('Router', ['createUrlTree', 'parseUrl']);
    feedbackSpy = jasmine.createSpyObj('GlobalFeedbackService', ['notifyError']);

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthStore, useValue: authStoreSpy },
        { provide: Router, useValue: routerSpy },
        { provide: GlobalFeedbackService, useValue: feedbackSpy },
      ]
    });
  });

  const executeGuard = (routeData: any) => {
    return TestBed.runInInjectionContext(() => permissionGuard({ data: routeData } as any, {} as any));
  };

  it('should return true if user is ADMIN', () => {
    authStoreSpy.isAuthenticated.and.returnValue(true);
    authStoreSpy.isAdmin.and.returnValue(true);

    const result = executeGuard({ roles: ['OTHER'] });
    expect(result).toBeTrue();
  });

  it('should return true if user has required role', () => {
    authStoreSpy.isAuthenticated.and.returnValue(true);
    authStoreSpy.isAdmin.and.returnValue(false);
    authStoreSpy.user.and.returnValue({ roles: ['TECNICO'] } as any);

    const result = executeGuard({ roles: ['TECNICO'] });
    expect(result).toBeTrue();
  });

  it('should redirect to login if not authenticated', () => {
    authStoreSpy.isAuthenticated.and.returnValue(false);
    const urlTree = {} as UrlTree;
    routerSpy.createUrlTree.and.returnValue(urlTree);

    const result = executeGuard({ roles: ['ADMIN'] });
    expect(result).toBe(urlTree);
    expect(routerSpy.createUrlTree).toHaveBeenCalledWith(['/auth/login']);
  });

  it('should deny access and notify if user does not have required role', () => {
    authStoreSpy.isAuthenticated.and.returnValue(true);
    authStoreSpy.isAdmin.and.returnValue(false);
    authStoreSpy.user.and.returnValue({ roles: ['TECNICO'] } as any);
    
    const urlTree = {} as UrlTree;
    routerSpy.createUrlTree.and.returnValue(urlTree);

    const result = executeGuard({ roles: ['JURIDICO'] });
    expect(result).toBe(urlTree);
    expect(feedbackSpy.notifyError).toHaveBeenCalled();
    expect(routerSpy.createUrlTree).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should check for granular permissions', () => {
    authStoreSpy.isAuthenticated.and.returnValue(true);
    authStoreSpy.isAdmin.and.returnValue(false);
    authStoreSpy.user.and.returnValue({ roles: ['TECNICO'], permissions: ['process:read'] } as any);

    const result = executeGuard({ permissions: ['process:read'] });
    expect(result).toBeTrue();
  });
});
