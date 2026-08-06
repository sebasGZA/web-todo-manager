import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { TaskStatus } from '../../models/types/task-status.type';
import { TASK_STATUS_LABELS } from '../../models/utils/task-flow.util';

@Component({
    selector: 'app-status-badge',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './status-badge.component.html',
    styleUrl: './status-badge.component.scss'
})
export class StatusBadgeComponent {
    @Input({ required: true }) status!: TaskStatus;

    get label(): string {
        return TASK_STATUS_LABELS[this.status];
    }
}
