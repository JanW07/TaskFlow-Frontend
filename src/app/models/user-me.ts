import { Board } from './board';

export interface UserMe {
  id: number;
  login: string;
  firstName: string;
  lastName: string;
  boards: Board[];
}
