import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

import { Task } from '../models/interfaces/task.interface'
import { CreateTaskDto } from '../models/dtos/create-task.dto'
import { UpdateTaskDto } from '../models/dtos/update-task.dto'

@Injectable({ providedIn: 'root' })
export class TaskService {
  private readonly baseUrl = `${environment.apiUrl}/tasks`;
  private readonly apiKey = `Bearer ${environment.apiKey}`

  constructor(private readonly http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl, {
      headers: {
        Authorization: this.apiKey
      }
    });
  }

  getTask(id: string): Observable<Task> {
    return this.http.get<Task>(`${this.baseUrl}/${id}`, {
      headers: {
        authorization: this.apiKey
      }
    });
  }

  createTask(dto: CreateTaskDto): Observable<Task> {
    return this.http.post<Task>(this.baseUrl, dto , {
      headers: {
        authorization: this.apiKey
      }
    });
  }

  updateTask(id: string, dto: UpdateTaskDto): Observable<Task> {
    return this.http.patch<Task>(`${this.baseUrl}/${id}`, dto, {
      headers: {
        authorization: this.apiKey
      }
    });
  }

  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, {
      headers: {
        authorization: this.apiKey
      }
    });
  }
}
