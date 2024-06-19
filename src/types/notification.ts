interface Notifications {
  id: number;
  teamId: string;
  userId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface NotificationDataType {
  totalCount: number;
  notifications: Notifications[];
  cursorId: number;
}

export interface NotificationDropdownItemProps {
  content: string;
  updatedAt: string;
  notificationId: number;
}
