import { TestBed } from '@angular/core/testing';

import { UserServiceBaseService } from './user-service-base.service';

describe('UserServiceBaseService', () => {
  let service: UserServiceBaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserServiceBaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
