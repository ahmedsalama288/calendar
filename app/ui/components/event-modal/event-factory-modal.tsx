import { EventModalProps } from "@/app/types/types";
import AddEventModal from "./add-event-modal";
import EditEventModal from "./edit-event-modal";

interface EventFactoryModalProps {
  type: "add" | "edit";
  props: EventModalProps;
}

export default function EventFactoryModal({
  type,
  props,
}: EventFactoryModalProps) {
  switch (type) {
    case "add":
      return <AddEventModal {...props} />;
    case "edit":
      return <EditEventModal {...props} />;
  }
}
