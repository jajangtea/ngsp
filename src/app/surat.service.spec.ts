import { TestBed } from '@angular/core/testing';

import { SuratService } from './surat.service';

describe('SuratService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SuratService = TestBed.get(SuratService);
    expect(service).toBeTruthy();
  });
});
