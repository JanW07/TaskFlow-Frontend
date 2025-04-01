import { BoardStage } from './board-stage';

export interface Task {
    id: number;
    name: string;
    description: string;
    users: string[];
    board: string;
    completed: boolean;
    boardStage: BoardStage;
  }
  