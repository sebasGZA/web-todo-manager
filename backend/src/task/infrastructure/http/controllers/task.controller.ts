import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";

import { AuthGuard } from "../guards/Auth.guard";
import { TaskService } from "../../../application/task.service";
import { CreateTaskDto } from "../dtos/create-task.dto";
import { UpdateTaskDto } from "../dtos/update-task.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags('Tasks')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('tasks')
export class TaskController {
    constructor(private readonly taskService: TaskService) { }

    @Post()
    create(@Body() createDto: CreateTaskDto) {
        return this.taskService.createTask(createDto.title, createDto.status, createDto.description);
    }

    @Get()
    findAll() {
        return this.taskService.listTasks();
    }

    @Get(':id')
    findById(@Param('id') id: string) {
        return this.taskService.listById(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateDto: UpdateTaskDto) {
        return this.taskService.patchTask({ ...updateDto, id });
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.taskService.deleteTask(id);
    }
}