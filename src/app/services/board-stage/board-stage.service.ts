import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BoardStage } from '../../models/board-stage';

@Injectable({
  providedIn: 'root'
})
export class BoardStageService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  createStage(boardId: number, stageName: string): Observable<BoardStage> {
    return this.http.post<BoardStage>(
      `${this.apiUrl}/board/${boardId}/stage`, 
      stageName,
      { headers: { 'Content-Type': 'text/plain' } }
    );
  }

  updateStage(boardId: number, stageNumber: number, stageName: string): Observable<BoardStage> {
    return this.http.patch<BoardStage>(
      `${this.apiUrl}/board/${boardId}/stage/${stageNumber}`, 
      stageName,
      { headers: { 'Content-Type': 'text/plain' } }
    );
  }

  deleteStage(boardId: number, stageNumber: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/board/${boardId}/stage/${stageNumber}`);
  }

  getStages(boardId: number): Observable<BoardStage[]> {
    return this.http.get<BoardStage[]>(`${this.apiUrl}/board/${boardId}/stage`);
  }

  getStageByNumber(boardId: number, stageNumber: number): Observable<BoardStage> {
    return this.http.get<BoardStage>(`${this.apiUrl}/board/${boardId}/stage/${stageNumber}`);
  }
}
