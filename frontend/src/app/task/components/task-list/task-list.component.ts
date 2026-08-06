import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { finalize } from 'rxjs';

import { TaskService } from '../../services/task.service';
import { NotificationService } from '../../../../shared/services/notification.service';
import { Task } from '../../models/interfaces/task.interface';
import { AppError } from '../../../../shared/models/interfaces/app-error.interface';
import { TaskItemComponent } from "../task-item/task-item.component";
import { TaskFormComponent, TaskFormSubmit } from "../task-form/task-form.component";
import { CreateTaskDto } from '../../models/dtos/create-task.dto';
import { UpdateTaskDto } from '../../models/dtos/update-task.dto';
import { ConfirmDialogComponent } from "../confirm-dialog/confirm-dialog.component";

@Component({
    selector: 'app-task-list',
    standalone: true,
    imports: [CommonModule, TaskItemComponent, TaskFormComponent, ConfirmDialogComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './task-list.component.html',
    styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit {
    readonly tasks = signal<Task[]>([]);
    readonly loading = signal(true);
    readonly loadError = signal<AppError | null>(null);

    readonly showForm = signal(false);
    readonly editingTask = signal<Task | null>(null);
    readonly saving = signal(false);
    readonly formError = signal<string | null>(null);

    readonly taskPendingDelete = signal<Task | null>(null);
    readonly deleting = signal(false);

    constructor(
        private readonly taskService: TaskService,
        private readonly notifications: NotificationService
    ) { }

    ngOnInit(): void {
        this.loadTasks();
    }

    loadTasks(): void {
        this.loading.set(true);
        this.loadError.set(null);

        this.taskService
            .getTasks()
            .pipe(finalize(() => this.loading.set(false)))
            .subscribe({
                next: (tasks) => this.tasks.set(tasks),
                error: (err: AppError) => {
                    this.loadError.set(err);
                }
            });
    }

    openCreateForm(): void {
        this.editingTask.set(null);
        this.formError.set(null);
        this.showForm.set(true);
    }

    openEditForm(task: Task): void {
        this.editingTask.set(task);
        this.formError.set(null);
        this.showForm.set(true);
    }

    closeForm(): void {
        this.showForm.set(false);
        this.editingTask.set(null);
        this.formError.set(null);
    }

    handleFormSubmit(event: TaskFormSubmit): void {
        this.saving.set(true);
        this.formError.set(null);

        const current = this.editingTask();

        const request$ = current
            ? this.taskService.updateTask(current.id, event.value as UpdateTaskDto)
            : this.taskService.createTask(event.value as CreateTaskDto);

        request$.pipe(finalize(() => this.saving.set(false))).subscribe({
            next: (task) => {
                if (current) {
                    this.tasks.update((list) => list.map((t) => (t.id === task.id ? task : t)));
                    this.notifications.success('Tarea actualizada correctamente.');
                } else {
                    this.tasks.update((list) => [task, ...list]);
                    this.notifications.success('Tarea creada correctamente.');
                }
                this.closeForm();
            },
            error: (err: AppError) => {
                if (err.kind === 'validation') {
                    this.formError.set(err.message);
                } else {
                    this.notifications.error(err.message);
                }
            }
        });
    }

    requestDelete(task: Task): void {
        this.taskPendingDelete.set(task);
    }

    cancelDelete(): void {
        this.taskPendingDelete.set(null);
    }

    confirmDelete(): void {
        const task = this.taskPendingDelete();
        if (!task) return;

        this.deleting.set(true);
        this.taskService
            .deleteTask(task.id)
            .pipe(finalize(() => this.deleting.set(false)))
            .subscribe({
                next: () => {
                    this.tasks.update((list) => list.filter((t) => t.id !== task.id));
                    this.taskPendingDelete.set(null);
                    this.notifications.success('Tarea eliminada.');
                },
                error: (err: AppError) => {
                    this.taskPendingDelete.set(null);
                    if (err.kind === 'not_found') {
                        this.tasks.update((list) => list.filter((t) => t.id !== task.id));
                    }
                    this.notifications.error(err.message);
                }
            });
    }


}
