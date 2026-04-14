import { TestBed } from '@angular/core/testing';
import { MessageService, ConfirmationService } from 'primeng/api';
import { GlobalFeedbackService } from './global-feedback.service';

describe('GlobalFeedbackService', () => {
  let service: GlobalFeedbackService;
  let messageServiceSpy: jasmine.SpyObj<MessageService>;
  let confirmationServiceSpy: jasmine.SpyObj<ConfirmationService>;

  beforeEach(() => {
    messageServiceSpy = jasmine.createSpyObj('MessageService', ['add']);
    confirmationServiceSpy = jasmine.createSpyObj('ConfirmationService', ['confirm']);

    TestBed.configureTestingModule({
      providers: [
        GlobalFeedbackService,
        { provide: MessageService, useValue: messageServiceSpy },
        { provide: ConfirmationService, useValue: confirmationServiceSpy }
      ]
    });
    service = TestBed.inject(GlobalFeedbackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call messageService.add when notifySuccess is called', () => {
    service.notifySuccess('Success', 'Detail');
    expect(messageServiceSpy.add).toHaveBeenCalledWith({
      severity: 'success',
      summary: 'Success',
      detail: 'Detail'
    });
  });

  it('should call messageService.add when notifyError is called', () => {
    service.notifyError('Error', 'Detail');
    expect(messageServiceSpy.add).toHaveBeenCalledWith({
      severity: 'error',
      summary: 'Error',
      detail: 'Detail'
    });
  });

  it('should call confirmationService.confirm when confirmAction is called', () => {
    const acceptCallback = () => {};
    service.confirmAction({
      header: 'Confirm',
      message: 'Are you sure?',
      accept: acceptCallback
    });
    expect(confirmationServiceSpy.confirm).toHaveBeenCalledWith(jasmine.objectContaining({
      header: 'Confirm',
      message: 'Are you sure?',
      accept: acceptCallback
    }));
  });
});
