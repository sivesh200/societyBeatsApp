import { TestBed, inject } from '@angular/core/testing';

import { ComunitiesService } from './comunities.service';

describe('ComunitiesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComunitiesService]
    });
  });

  it('should be created', inject([ComunitiesService], (service: ComunitiesService) => {
    expect(service).toBeTruthy();
  }));
});
