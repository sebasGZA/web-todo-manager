import { TaskStatus } from '../types/task-status.type'

export interface UpdateTaskDto {
  title?: string;
  description?: string;
  status?: TaskStatus;
}