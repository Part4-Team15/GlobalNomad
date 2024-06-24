export interface Activities {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface MyActivityType {
  cursorId: number;
  totalCount: number;
  activities: Activities[];
}

export interface MyActivityCardProps {
  activity: Activities;
  refetchActivities: () => void;
}

export interface ExperienceDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  activityId: number;
  onDelete: () => void;
  refetchActivities: () => void;
}
