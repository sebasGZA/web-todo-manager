import { Injectable, signal } from '@angular/core';

import { NotificationType } from '../models/types/notification.type';
import { Notification } from '../models/interfaces/notification.interface';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private nextId = 0;
  private readonly _notifications = signal<Notification[]>([]);
  readonly notifications = this._notifications.asReadonly();

  success(message: string, autoCloseMs = 3500): void {
    this.push('success', message, autoCloseMs);
  }

  error(message: string, autoCloseMs = 5000): void {
    this.push('error', message, autoCloseMs);
  }

  info(message: string, autoCloseMs = 3500): void {
    this.push('info', message, autoCloseMs);
  }

  dismiss(id: number): void {
    this._notifications.update((list) => list.filter((n) => n.id !== id));
  }

  private push(type: NotificationType, message: string, autoCloseMs: number): void {
    const id = this.nextId++;
    this._notifications.update((list) => [...list, { id, type, message }]);
    if (autoCloseMs > 0) {
      setTimeout(() => this.dismiss(id), autoCloseMs);
    }
  }
}
