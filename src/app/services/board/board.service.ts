import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Board } from '../../models/board';
import { environment } from '../../../environments/environment';


export interface CreateBoardDTO {
  name: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  createBoard(board: CreateBoardDTO): Observable<Board> {
    return this.http.post<Board>(`${this.apiUrl}/board`, board);
  }

  deleteBoard(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/board/${id}`);
  }

  updateBoard(id: number, board: CreateBoardDTO): Observable<Board> {
    return this.http.patch<Board>(`${this.apiUrl}/board/${id}`, board);
  }

  getBoard(id: number): Observable<Board> {
    return this.http.get<Board>(`${this.apiUrl}/board/${id}`);
  }
}
