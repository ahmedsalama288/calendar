"use client";
import { cn, formatDateToDateInput } from "@/app/util/utils";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { SubmitHandler, useForm } from "react-hook-form";
import InputErrorMessage from "./input-error-message";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { EventModalProps } from "@/app/types/types";
import { editEvent } from "@/app/db/db";

const fromSchema = z.object({
  eventTitle: z.string().min(3),
  selectedStartDate: z.date().or(z.string()),
  selectedEndDate: z.date().or(z.string()),
  eventDescription: z.string().min(4),
});
type FormFields = z.infer<typeof fromSchema>;

export default function EditEventModal({
  isModalOpen,
  onCloseModal,
  userSession,
  eventData,
}: EventModalProps) {
  const form = useForm<FormFields>({
    defaultValues: {
      eventTitle: eventData?.title,
      eventDescription: eventData?.description,
      selectedStartDate: formatDateToDateInput(eventData?.start as Date),
      selectedEndDate: formatDateToDateInput(eventData?.end as Date),
    },
    resolver: zodResolver(fromSchema),
  });

  console.log(eventData);

  const formErrors = form.formState.errors;

  const onSubmit: SubmitHandler<FormFields> = ({
    eventTitle,
    eventDescription,
    selectedStartDate,
    selectedEndDate,
  }) => {
    const formData = {
      id: eventData?.id as string,
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
    editEvent(email as string, formData);
    handleCloseForm();
  };

  const handleCloseForm = () => {
    form.resetField("eventTitle");
    form.resetField("eventDescription");
    form.clearErrors();
    onCloseModal();
  };

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          key="modal"
          initial={{ opacity: 0, x: "-50%", y: "-40px" }}
          animate={{ opacity: 1, y: "0px" }}
          exit={{ opacity: 0, y: "-40px" }}
          className="p-2 w-[95%] sm:w-full absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-50"
        >
          <div
            className={cn(
              "w-[400px] max-w-full",
              "absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-50",
              "p-4 rounded  bg-white flex flex-col gap-4"
            )}
          >
            <div className=" flex flex-col">
              <button onClick={handleCloseForm} className=" ml-auto">
                <XMarkIcon className="h-7 w-7 text-gray-500 hover:text-gray-600" />
              </button>
              <h3 className=" text-xl mx-auto">Edit event</h3>
            </div>

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
          </div>
        </motion.div>
      )}
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
          className="absolute inset-full bg-black bg-opacity-50  w-full h-full z-10 top-0 left-0"
          onClick={handleCloseForm}
        ></motion.div>
      )}
    </AnimatePresence>
  );
}
