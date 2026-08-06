import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent {
  constructor(readonly notifications: NotificationService) {}

  dismiss(id: number): void {
    this.notifications.dismiss(id);
  }
}
