import { TaskStatus } from '../types/task-status.type'

export interface CreateTaskDto {
  title: string;
  description?: string;
  status?: TaskStatus;
}