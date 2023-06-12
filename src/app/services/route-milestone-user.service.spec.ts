import { TestBed } from '@angular/core/testing';

import { RouteMilestoneUserService } from './route-milestone-user.service';

describe('RouteMilestoneUserService', () => {
  let service: RouteMilestoneUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouteMilestoneUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
