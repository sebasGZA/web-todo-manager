import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { Task } from '../../models/interfaces/task.interface';
import { StatusBadgeComponent } from '../status-badge/status-badge.component';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule, StatusBadgeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss'
})
export class TaskItemComponent {
  @Input({ required: true }) task!: Task;

  @Output() edit = new EventEmitter<Task>();
  @Output() remove = new EventEmitter<Task>();
}
