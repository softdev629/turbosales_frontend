import { Dayjs } from "dayjs";

export const fromDayjsToDate = (dayjs: Dayjs) => {
  const year = dayjs.year();
  const month = dayjs.month();
  const day = dayjs.date();
  const date = new Date(year, month + 1, day);
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
  return formattedDate;
};
