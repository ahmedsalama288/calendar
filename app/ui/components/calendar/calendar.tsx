"use client";

import {
  Calendar as BigCalender,
  momentLocalizer,
  View,
  Views,
  SlotInfo,
} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { use, useCallback, useEffect, useMemo, useState } from "react";
import moment from "moment";
import { dayRangeHeaderFormat } from "@/app/util/utils";
import { Session } from "next-auth";
import { getUserEvents } from "@/app/db/db";
import { StoredEvent } from "@/app/types/types";
import EventFactoryModal from "../event-modal/event-factory-modal";

const localizer = momentLocalizer(moment);

interface Props {
  userSession: Session | null;
}

export default function Calendar({ userSession }: Props) {
  const [date, setDate] = useState(new Date());
  const [userView, setView] = useState<View>(Views.MONTH);
  const [slotInfo, setSlotInfo] = useState<SlotInfo>();
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);
  const [events, setEvents] = useState<StoredEvent[]>([]);
  const [selectedEventData, setSelectedEventData] = useState<StoredEvent>();
  const [eventModalType, setEventModalType] = useState("");

  const handleOpenTheEventModal = () => {
    setIsAddEventModalOpen(true);
  };

  const handleCloseTheEventModal = () => {
    setIsAddEventModalOpen(false);
  };

  const onNavigate = useCallback(
    (newDate: Date) => setDate(newDate),
    [setDate]
  );
  const onView = useCallback((newView: View) => setView(newView), []);

  const { formats } = useMemo(
    () => ({
      formats: {
        dayHeaderFormat: (date: Date) => moment(date).format("MMMM DD YYYY"),
        dayRangeHeaderFormat,
      },
    }),
    []
  );
  console.log("suuuuu");

  const onSelectSlot = useCallback((slotInfo: SlotInfo) => {
    setSlotInfo(slotInfo);
    setEventModalType("add");
    handleOpenTheEventModal();
  }, []);

  useEffect(() => {
    let userEvents = getUserEvents((userSession?.user?.email as string) || "");
    if (!userEvents) return;

    setEvents(userEvents);
    console.log("hi");
  }, [userSession, isAddEventModalOpen === false]);

  return (
    <div className=" w-fit max-w-full">
      <BigCalender
        className=" w-[900px] !h-[570px] max-w-full flex"
        events={events}
        date={date}
        localizer={localizer}
        showMultiDayTimes={true}
        startAccessor="start"
        endAccessor="end"
        onView={onView}
        view={userView}
        onNavigate={onNavigate}
        onSelectSlot={onSelectSlot}
        formats={formats}
        onSelectEvent={(data: StoredEvent) => {
          setSelectedEventData(data);
          setEventModalType("edit");
          setIsAddEventModalOpen(true);
        }}
        selectable
      />
      <EventFactoryModal
        type={eventModalType as "add" | "edit"}
        props={{
          startDate: slotInfo?.start as Date,
          endDate: slotInfo?.end as Date,
          isModalOpen: isAddEventModalOpen,
          onCloseModal: handleCloseTheEventModal,
          view: userView,
          userSession: userSession,
          eventData: selectedEventData,
        }}
      />
    </div>
  );
}
