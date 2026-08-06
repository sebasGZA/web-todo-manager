import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateTaskDto } from '../../models/dtos/create-task.dto';
import { UpdateTaskDto } from '../../models/dtos/update-task.dto';
import { Task } from '../../models/interfaces/task.interface';
import { TaskStatus } from '../../models/types/task-status.type';
import { TASK_STATUS_LABELS } from '../../models/utils/task-flow.util';

export interface TaskFormSubmit {
  mode: 'create' | 'edit';
  value: CreateTaskDto | UpdateTaskDto;
}

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent implements OnChanges {
  @Input() task: Task | null =  null;
  @Input() saving = false;
  @Input() serverError: string | null = null;

  @Output() submitted = new EventEmitter<TaskFormSubmit>();
  @Output() cancelled = new EventEmitter<void>();

  readonly statusOptions: TaskStatus[] = ['pending', 'in_progress', 'done'];
  readonly statusLabels = TASK_STATUS_LABELS;

  private readonly fb = inject(FormBuilder);

  form = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(80)]],
    description: ['', [Validators.maxLength(500)]],
    status: ['pending' as TaskStatus, [Validators.required]]
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['task']) {
      if (this.task) {
        this.form.patchValue({
          title: this.task.title,
          description: this.task.description,
          status: this.task.status
        });
      } else {
        this.form.reset({ title: '', description: '', status: 'pending' });
      }
    }
  }

  get title() {
    return this.form.controls.title;
  }

  get description() {
    return this.form.controls.description ?? undefined;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const raw = this.form.getRawValue();
    if (this.task) {
      this.submitted.emit({
        mode: 'edit',
        value: {
          title: raw.title!,
          description: raw.description || undefined,
          status: raw.status!
        }
      });
    } else {
      this.submitted.emit({
        mode: 'create',
        value: {
          title: raw.title!,
          description: raw.description || undefined,
          status: raw.status!
        }
      });
    }
  }
}
