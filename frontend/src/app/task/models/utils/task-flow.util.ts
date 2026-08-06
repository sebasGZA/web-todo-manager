import { type TaskStatus } from '../types/task-status.type'

export const TASK_STATUS_FLOW: TaskStatus[] = ['pending', 'in_progress', 'done'];

export const TASK_STATUS_LABELS: Record<TaskStatus, string> = {
  pending: 'Pendiente',
  in_progress: 'En progreso',
  done: 'Completada'
};
