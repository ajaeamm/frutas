import { TestBed } from '@angular/core/testing';

import { Fruta } from './fruta';

describe('Fruta', () => {
  let service: Fruta;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Fruta);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
