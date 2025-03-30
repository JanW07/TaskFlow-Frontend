import { Board } from './board';

export interface LoginResponse {
  token: string;
  sig: string;
  email: string;
}
