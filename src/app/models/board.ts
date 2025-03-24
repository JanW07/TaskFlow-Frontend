import { Task } from './task';

export interface Board {
  id: number;
  name: string;
  description: string;
  tasks: Task[];
  users: string[];
}
