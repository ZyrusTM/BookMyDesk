import { TestBed } from '@angular/core/testing';

import { BookingDataHandlerService } from './booking-data-handler.service';

describe('BookingDataHandlerService', () => {
  let service: BookingDataHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookingDataHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
