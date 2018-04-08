import { TestBed, async, inject } from '@angular/core/testing';

import { ComfirmatioGuard } from './comfirmatio.guard';

describe('ComfirmatioGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComfirmatioGuard]
    });
  });

  it('should ...', inject([ComfirmatioGuard], (guard: ComfirmatioGuard) => {
    expect(guard).toBeTruthy();
  }));
});
