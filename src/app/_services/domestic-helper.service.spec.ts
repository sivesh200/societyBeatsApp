import { TestBed, inject } from '@angular/core/testing';

import { DomesticHelperService } from './domestic-helper.service';

describe('DomesticHelperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DomesticHelperService]
    });
  });

  it('should be created', inject([DomesticHelperService], (service: DomesticHelperService) => {
    expect(service).toBeTruthy();
  }));
});
