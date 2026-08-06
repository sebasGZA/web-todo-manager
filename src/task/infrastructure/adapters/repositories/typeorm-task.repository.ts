import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { TaskRepositoryPort } from "../../../domain/ports/repository/task-repository.port";
import { TaskTypeOrmEntity } from "../../persistence/task.typeorm.entity";
import { Task } from "../../../domain/entities/task.entity";

@Injectable()
export class TypeORMTaskRepository implements TaskRepositoryPort {
    constructor(
        @InjectRepository(TaskTypeOrmEntity)
        private readonly repo: Repository<TaskTypeOrmEntity>
    ) { }

    async save(task: Task): Promise<void> {
        await this.repo.save({
            ...task
        })
    }

    async findAll(): Promise<Task[]> {
        const tasks = await this.repo.find({ order: { createdAt: 'DESC' } })
        return tasks.map((task) =>
            new Task(
                task.id,
                task.title,
                task.createdAt,
                task.status,
                task.description,
                task.updatedAt,
            )
        )
    }

    async findById(id: string): Promise<Task | null> {
        const task = await this.repo.findOneBy({ id })
        if (!task) return null;
        return new Task(
            task.id,
            task.title,
            task.createdAt,
            task.status,
            task.description,
            task.updatedAt,
        )
    }

    async update(task: Partial<Task>): Promise<void> {
        await this.repo.save({
            ...task
        })
    }

    async removeById(id: string): Promise<void> {
        await this.repo.delete({ id })
    }

}