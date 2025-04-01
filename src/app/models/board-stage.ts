import { Task } from './task';

export interface BoardStage {
  boardId: number;        // Identifies which board this stage belongs to
  stageNumber: number;    // The stage number within that board
  name: string;
  tasks: Task[];
  board: string;
}
