import { ReactNode } from 'react';
import { BookingData } from './myReservationHistory';

export interface BookingHistoryProps {
  booking: BookingData;
}

export interface ModalBackgroundProps {
  onClose: () => void;
  children: React.ReactNode;
}

export interface ModalPortalProps {
  children: ReactNode;
}

export interface ReviewFormProps {
  onSubmit: (review: string, rating: number) => void;
  showWarning: boolean;
  setShowWarning: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}

export interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: BookingData | null;
}

export interface ReviewModalBtnProps {
  handleSubmit: () => void;
  showWarning: boolean;
  message: string;
}

export interface ReviewDWarningPopupProps {
  message: string;
  isVisible: boolean;
}

export interface StarRatingProps {
  onRatingChange: (rating: number) => void;
}
