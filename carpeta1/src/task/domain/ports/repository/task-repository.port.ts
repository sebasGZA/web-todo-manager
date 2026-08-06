import { Task } from "../../entities/task.entity";

export const TASK_REPOSITORY = 'TASK_REPOSITORY';

export interface TaskRepositoryPort {
    save(task: Task): Promise<void>;
    findAll(): Promise<Task[]>;
    findById(id: string): Promise<Task | null>;
    removeById(id: string): Promise<void>;
    update(task: Partial<Task>): Promise<void>
}