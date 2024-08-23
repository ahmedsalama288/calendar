import moment from "moment";
import { Dispatch, SetStateAction } from "react";
import { NavigateAction, View } from "react-big-calendar";
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function dayRangeHeaderFormat({
  start,
  end,
}: {
  start: Date;
  end: Date;
}) {
  // Months
  const theMonthOfFirstDay = moment(start).format("MMMM");
  const theMonthOfLastDay = moment(end).format("MMMM");

  // Years
  const theYearOfFirstDay = moment(start).format("YYYY");
  const theYearOfLastDay = moment(end).format("YYYY");

  if (theMonthOfFirstDay === theMonthOfLastDay) {
    return `${theMonthOfFirstDay} ${theYearOfFirstDay}`;
  } else if (theYearOfFirstDay !== theYearOfLastDay) {
    return `${theMonthOfFirstDay}  ${theYearOfFirstDay} - ${theMonthOfLastDay} ${theYearOfLastDay}`;
  } else {
    return `${theMonthOfFirstDay} - ${theMonthOfLastDay} ${theYearOfFirstDay}`;
  }
}

export function dateOnNavigation(
  newDate: Date,
  view: View,
  action: NavigateAction,
  setDate: Dispatch<SetStateAction<Date>>
) {
  console.log(action);

  switch (action) {
    case "TODAY":
      setDate(new Date());
      break;
    case "NEXT":
  }
}

export function formatDateInDateAndTime(
  dateObject: Date,
  view: View,
  isEndDate?: boolean
) {
  // Create a Moment object from the given date
  const baseDate = moment(dateObject);

  if (view !== "month") {
    return baseDate.format("YYYY-MM-DDTHH:mm");
  }

  const currentTime = moment();
  baseDate.set({
    day: isEndDate ? baseDate.add(-1).get("day") : baseDate.get("day"),
    hour: isEndDate ? currentTime.add(0.5, "hour").hour() : currentTime.hour(),
    minute: currentTime.minutes(),
    second: currentTime.second(),
  });

  return baseDate.format("YYYY-MM-DDTHH:mm");
}

export function formatDateToDateInput(date: Date){
  return moment(date).format("YYYY-MM-DDTHH:mm")
}
