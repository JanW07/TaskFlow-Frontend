import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../../models/task';

@Injectable({
  providedIn: 'root'
})
export class BoardStageTaskService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  changeTaskStage(boardId: number, taskId: number, stageNumber: number):
  Observable<Task> {
    return this.http.patch<Task>(
      `${this.apiUrl}/board/${boardId}/task-stage/${stageNumber}/task/${taskId}`,
      null);
  }

  getTasksOnStage(boardId: number, stageNumber: number):
  Observable<Task[]> {
    return this.http.get<Task[]>(
      `${this.apiUrl}/board/${boardId}/task-stage/${stageNumber}`);
  }
}
