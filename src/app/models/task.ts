import { BoardStage } from './board-stage';
import type { Board } from './board';

export interface Task {
    id: number;
    name: string;
    description: string;
    users: string[];
    board: Board;
    completed: boolean;
    boardStage: BoardStage;
  }
  