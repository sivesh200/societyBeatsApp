import { TestBed, inject } from '@angular/core/testing';

import { SocietyService } from './society.service';

describe('SocietyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SocietyService]
    });
  });

  it('should be created', inject([SocietyService], (service: SocietyService) => {
    expect(service).toBeTruthy();
  }));
});
