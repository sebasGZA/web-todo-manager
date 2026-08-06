import { Inject, Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { TASK_REPOSITORY, type TaskRepositoryPort } from "../domain/ports/repository/task-repository.port";
import { Task } from "../domain/entities/task.entity";
import { TaskStatus } from "../domain/enums/task-status.enum";

@Injectable()
export class TaskService {
    private logger: Logger;
    constructor(
        @Inject(TASK_REPOSITORY)
        private readonly taskRepository: TaskRepositoryPort
    ) {
        this.logger = new Logger(TaskService.name)
    }

    async createTask(title: string, status: TaskStatus,description?: string) {
        try {
            const task = Task.create(title, status, description)
            await this.taskRepository.save(task);
            return task;
        } catch (error: any) {
            this.logger.error(error?.message)
            throw new InternalServerErrorException('No se pudo crear la tarea')
        }

    }

    listTasks() {
        return this.taskRepository.findAll();
    }

    async listById(id: string) {
        const task = await this.taskRepository.findById(id)
        if (!task) throw new NotFoundException(`Tarea no encontrada por id: ${id}`)
        return task;
    }

    async patchTask({ id, description, title, status }: Partial<Task>) {
        try {
            const task = await this.listById(id!)
            const taskUpdated = task.update(
                title,
                description,
                status,
            )
            await this.taskRepository.update(taskUpdated)
            return taskUpdated;
        } catch (error: any) {
            this.logger.error(error?.message)
            throw new InternalServerErrorException('No se pudo actualizar la tarea')
        }

    }

    async deleteTask(id: string) {
        try {
            await this.listById(id)
            return this.taskRepository.removeById(id)
        } catch (error: any) {
            this.logger.error(error?.message)
            throw new InternalServerErrorException('No se pudo eliminar la tarea')
        }
    }
}