import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TASK_REPOSITORY } from './domain/ports/repository/task-repository.port';
import { TaskService } from './application/task.service';
import { TaskTypeOrmEntity } from './infrastructure/persistence/task.typeorm.entity';
import { TypeORMTaskRepository } from './infrastructure/adapters/repositories/typeorm-task.repository';
import { TaskController } from './infrastructure/http/controllers/task.controller';

@Module({
    imports: [TypeOrmModule.forFeature([TaskTypeOrmEntity])],
    providers: [
        TaskService,
        {
            provide: TASK_REPOSITORY, useClass: TypeORMTaskRepository
        }
    ],
    controllers: [TaskController]
})
export class TaskModule { }
