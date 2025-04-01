import { TestBed } from '@angular/core/testing';

import { BoardStageService } from './board-stage.service';

describe('BoardStageService', () => {
  let service: BoardStageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoardStageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
