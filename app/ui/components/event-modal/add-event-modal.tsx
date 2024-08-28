"use client";
import { cn, formatDateInDateAndTime } from "@/app/util/utils";
import { useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { SubmitHandler, useForm } from "react-hook-form";
import InputErrorMessage from "./input-error-message";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { addNewEvent, addUser } from "@/app/db/db";
import { v4 as uuid } from "uuid";
import { EventModalProps, Event } from "@/app/types/types";
import AnimateEventModalContainer from "./animate-event-modal-container";

const fromSchema = z.object({
  eventTitle: z.string().min(3),
  selectedStartDate: z.date().or(z.string()),
  selectedEndDate: z.date().or(z.string()),
  eventDescription: z.string().min(4),
});
type FormFields = z.infer<typeof fromSchema>;

export default function AddEventModal({
  startDate = new Date(),
  endDate = new Date(),
  isModalOpen,
  onCloseModal,
  view,
  userSession,
}: EventModalProps) {
  const startEventDate = formatDateInDateAndTime(startDate, view);
  const endEventDate = formatDateInDateAndTime(endDate, view, true);

  const form = useForm<FormFields>({
    defaultValues: {
      eventTitle: "",
      eventDescription: "",
      selectedStartDate: startEventDate,
      selectedEndDate: endEventDate,
    },
    resolver: zodResolver(fromSchema),
  });

  const formErrors = form.formState.errors;

  const onSubmit: SubmitHandler<FormFields> = ({
    eventTitle,
    eventDescription,
    selectedStartDate,
    selectedEndDate,
  }) => {
    const formData: Event = {
      id: uuid(),
      title: eventTitle,
      start: new Date(selectedStartDate),
      end: new Date(selectedEndDate),
      description: eventDescription,
    };
    if (!userSession?.user) {
      form.setError("root", {
        message: "Cannot save event data please sign in first",
      });
      return;
    }
    const { name: username, email } = userSession.user;
    addUser(username as string, email as string);
    addNewEvent(email as string, formData);
    handleCloseModal();
  };

  const handleCloseModal = () => {
    form.resetField("eventTitle");
    form.resetField("eventDescription");
    form.clearErrors();
    onCloseModal();
  };

  useEffect(() => {
    form.setValue("selectedStartDate", startEventDate);
    form.setValue("selectedEndDate", endEventDate);
  }, [startEventDate, endEventDate, form]);

  return (
    <AnimateEventModalContainer
      isModalOpen={isModalOpen}
      onCloseModal={handleCloseModal}
      modalTypeName="Add Event"
    >
      <form
        className=" flex flex-col gap-3"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div>
          <input
            className={cn(
              "p-2 bg-gray-100 focus:bg-white ring-gray-200 w-full",
              "text-lg outline-none focus:ring rounded placeholder:font-normal",
              "placeholder:text-lg placeholder:pl-2",
              !!formErrors.eventTitle && "ring-red-600"
            )}
            {...form.register("eventTitle")}
            type="text"
            placeholder="Add title"
            autoComplete="off"
          />

          <InputErrorMessage
            isThereError={!!formErrors.eventTitle}
            errorMessage={formErrors.eventTitle?.message}
          />
        </div>

        <div className=" flex gap-3 flex-col">
          <div className=" flex justify-between items-center bg-gray-100 rounded p-2 ">
            <label className=" inline-block mr-1" htmlFor="firstDay">
              Start:{" "}
            </label>
            <input
              className=" w-[220px] max-w-full outline-none bg-gray-100 rounded p-1"
              {...form.register("selectedStartDate")}
              type="datetime-local"
            />
            <InputErrorMessage
              isThereError={!!formErrors.selectedStartDate}
              errorMessage={formErrors.selectedStartDate?.message}
            />
          </div>
          <div className=" flex justify-between items-center bg-gray-100 rounded p-2 ">
            <label className=" inline-block mr-1" htmlFor="endDate">
              End:{" "}
            </label>
            <input
              className=" w-[220px] max-w-full outline-none bg-gray-100 rounded p-1"
              {...form.register("selectedEndDate")}
              type="datetime-local"
            />
            <InputErrorMessage
              isThereError={!!formErrors.selectedEndDate}
              errorMessage={formErrors.selectedEndDate?.message}
            />
          </div>
        </div>

        <div className=" flex flex-col gap-1">
          <label htmlFor="description">Description</label>
          <textarea
            className={cn(
              " w-full p-2 min-h-[120px] max-h-[250px] bg-gray-100 outline-none focus:ring ring-gray-200 focus:bg-white rounded",
              !!formErrors.eventDescription && "ring-red-600"
            )}
            {...form.register("eventDescription")}
          ></textarea>
          <InputErrorMessage
            isThereError={!!formErrors.eventDescription}
            errorMessage={formErrors.eventDescription?.message}
          />
        </div>

        <button
          className=" bg-gray-900 text-white text-lg rounded py-2 "
          type="submit"
        >
          Save
        </button>
        <InputErrorMessage
          isRootError={true}
          isThereError={!!formErrors.root}
          errorMessage={formErrors.root?.message}
        />
      </form>
    </AnimateEventModalContainer>
  );
}
