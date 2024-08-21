import { TestBed } from '@angular/core/testing';

import { ModuletypeService } from './moduletype.service';

describe('ModuletypeService', () => {
  let service: ModuletypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModuletypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
