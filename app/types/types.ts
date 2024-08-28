import { Session } from "next-auth";
import { View } from "react-big-calendar";

export interface User {
  username: string;
  email: string;
  events: Event[];
}

export interface Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
  description?: string;
}

export interface EventModalProps {
  isModalOpen: boolean;
  startDate?: Date;
  endDate?: Date;
  onCloseModal: () => void;
  view: View;
  userSession: Session | null;
  eventData?: Event;
}
