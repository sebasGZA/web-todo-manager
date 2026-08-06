import { TaskStatus } from "../enums/task-status.enum";

export class Task {
    constructor(
        readonly id: string,
        readonly title: string,
        readonly createdAt: Date,
        readonly status: TaskStatus,
        readonly description?: string,
        readonly updatedAt?: Date,
    ) { }

    static create(title: string, status: TaskStatus, description?: string) {
        if (!title || title.trim().length === 0) throw new Error('El titulo es requerido')
        return new Task(
            crypto.randomUUID(),
            title,
            new Date,
            status,
            description,
        )
    }

    changeStatus(status: TaskStatus) {
        return new Task(this.id, this.title, this.createdAt, status, this.description, new Date())
    }

    update(title?: string, description?: string, status?: TaskStatus) {
        return new Task(
            this.id,
            title || this.title,
            this.createdAt,
            status || this.status,
            description || this.description,
            new Date()
        )
    }
}