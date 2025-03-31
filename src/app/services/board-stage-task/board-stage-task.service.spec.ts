import { TestBed } from '@angular/core/testing';

import { BoardStageTaskService } from './board-stage-task.service';

describe('BoardStageTaskService', () => {
  let service: BoardStageTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoardStageTaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
