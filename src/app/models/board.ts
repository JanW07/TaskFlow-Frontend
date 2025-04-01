import { Task } from './task';
import { BoardStage } from './board-stage';

export interface Board {
  id: number;
  name: string;
  description: string;
  tasks: Task[];
  users: string[];
  boardStages: BoardStage[];
}
