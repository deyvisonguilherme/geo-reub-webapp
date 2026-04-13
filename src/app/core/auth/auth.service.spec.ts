import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { AuthResponse } from './auth.types';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login with username and password', () => {
    const mockResponse: AuthResponse = {
      token: 'fake-token',
      user: {
        id: '1',
        username: 'user',
        fullName: 'Full Name',
        email: 'user@example.com',
        roles: ['USER'],
        organizationId: 'org-1',
        organizationName: 'Org 1'
      }
    };

    service.login({ username: 'user', password: 'password' }).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('/api/auth/login');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ username: 'user', password: 'password' });
    req.flush(mockResponse);
  });

  it('should login with username, password and organizacao_id', () => {
    const mockResponse: AuthResponse = {
      token: 'fake-token',
      user: {
        id: '1',
        username: 'user',
        fullName: 'Full Name',
        email: 'user@example.com',
        roles: ['USER'],
        organizationId: 'org-2',
        organizationName: 'Org 2'
      }
    };

    service.login({ username: 'user', password: 'password', organizacao_id: 'org-2' }).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('/api/auth/login');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ username: 'user', password: 'password', organizacao_id: 'org-2' });
    req.flush(mockResponse);
  });
});
