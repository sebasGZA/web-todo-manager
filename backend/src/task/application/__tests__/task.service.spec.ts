import { Task } from "../../domain/entities/task.entity"
import { TaskStatus } from "../../domain/enums/task-status.enum"
import { TaskRepositoryPort } from "../../domain/ports/repository/task-repository.port"
import { TaskService } from "../task.service"

describe('TaskService', () => {
    const fakeRepo: jest.Mocked<TaskRepositoryPort> = {
        save: jest.fn(),
        findAll: jest.fn(),
        findById: jest.fn(),
        removeById: jest.fn(),
        update: jest.fn(),
    };
    const taskService: TaskService = new TaskService(fakeRepo);;
    const taskId = crypto.randomUUID()
    const tasks = [
        new Task(taskId, 'Tarea A', new Date(), TaskStatus.PENDING),
        new Task(crypto.randomUUID(), 'Tarea A', new Date(), TaskStatus.PENDING)
    ];

    fakeRepo.findAll.mockResolvedValue(tasks)
    fakeRepo.findById.mockResolvedValue(tasks[0])

    it('should create a task', async () => {
        const title = 'title task';
        const description = 'This is a description';
        const task = await taskService.createTask(title, TaskStatus.PENDING, description);
        expect(task.title).toBe(title)
        expect(task.description).toBe(description)

        expect(fakeRepo.save).toHaveBeenCalled()
        expect(fakeRepo.save).toHaveBeenCalledWith(task)
    })

    it('should find tasks', async () => {
        const tasksResult = await taskService.listTasks()
        expect(tasksResult).toEqual(tasks)
        expect(fakeRepo.findAll).toHaveBeenCalled();
    })

    it('should find a task by Id', async () => {
        const taskResult = await taskService.listById(taskId);
        expect(taskResult).toEqual(tasks[0]);
        expect(fakeRepo.findById).toHaveBeenCalled();
        expect(fakeRepo.findById).toHaveBeenCalledWith(taskId);
    })

    it('should update a task', async () => {
        const titleUpdated = 'title updated'
        const updateDto = { id: taskId, title: titleUpdated };
        const taskResult = await taskService.patchTask(updateDto);
        expect(taskResult.title).toBe(titleUpdated);
        expect(fakeRepo.update).toHaveBeenCalled();
        expect(fakeRepo.update).toHaveBeenCalledWith(taskResult);
    })

    it('should delete a task by id', async () => {
        await taskService.deleteTask(taskId);
        expect(fakeRepo.removeById).toHaveBeenCalled();
        expect(fakeRepo.removeById).toHaveBeenCalledWith(taskId);
    })
})