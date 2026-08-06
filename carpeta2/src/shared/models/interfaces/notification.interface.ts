import { NotificationType } from "../types/notification.type";

export interface Notification {
  id: number;
  type: NotificationType;
  message: string;
}