import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../../models/task';
import { environment } from '../../../environments/environment';

export interface CreateTaskDTO {
  name: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getTasks(boardId: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/board/${boardId}/task`);
  }

  createTask(boardId: number, task: CreateTaskDTO): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}/board/${boardId}/task`, task);
  }

  deleteTask(boardId: number, id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/board/${boardId}/task/${id}`);
  }

  updateTask(boardId: number, id: number, task: CreateTaskDTO): Observable<Task> {
    return this.http.patch<Task>(`${this.apiUrl}/board/${boardId}/task/${id}`, task);
  }

  completeTask(boardId: number, id: number): Observable<Task> {
    return this.http.patch<Task>(`${this.apiUrl}/board/${boardId}/task/complete/${id}`, null);
  }
  unCompleteTask(boardId: number, id: number): Observable<Task> {
    return this.http.patch<Task>(`${this.apiUrl}/board/${boardId}/task/undo-complete/${id}`, null);
  }
}
