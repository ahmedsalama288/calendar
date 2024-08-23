import { Session } from "next-auth";
import { View } from "react-big-calendar";

export interface User {
  username: string;
  email: string;
  events: StoredEvent[];
}
export interface FirebaseUsers {
  [key: string]: User;
}

export interface Event {
  title: string;
  start: Date;
  end: Date;
  description?: string;
}

export interface StoredEvent extends Event {
  id: string;
}

export interface EventModalProps {
  isModalOpen: boolean;
  startDate?: Date;
  endDate?: Date;
  onCloseModal: () => void;
  view: View;
  userSession: Session | null;
  eventData?: StoredEvent;
}
