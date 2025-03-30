import { Board } from './board';

export interface UserMe {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  boards: Board[];
}
