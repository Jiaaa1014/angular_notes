import { TestBed, async, inject } from '@angular/core/testing';

import { ConfirmationGuard } from './confirmation.guard';

describe('ComfirmatioGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfirmationGuard]
    });
  });

  it('should ...', inject([ConfirmationGuard], (guard: ConfirmationGuard) => {
    expect(guard).toBeTruthy();
  }));
});
