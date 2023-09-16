import { Dayjs } from "dayjs";

export const fromDayjsToDate = (dayjs: Dayjs) => {
  const year = dayjs.year();
  const month = dayjs.month();
  const day = dayjs.date();
  const date = new Date(year, month, day);
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
  return formattedDate;
};

export function divideIntervals(
  startTimeStr: string,
  endTimeStr: string,
  duration: number
) {
  const intervals = [];

  const startTimeParts = startTimeStr.split(":");
  const endTimeParts = endTimeStr.split(":");

  const startTime = new Date();
  startTime.setHours(parseInt(startTimeParts[0], 10));
  startTime.setMinutes(parseInt(startTimeParts[1], 10));

  const endTime = new Date();
  endTime.setHours(parseInt(endTimeParts[0], 10));
  endTime.setMinutes(parseInt(endTimeParts[1], 10));

  duration = duration * 60 * 60 * 1000;

  let currentStartTime = new Date(startTime.getTime());

  while (currentStartTime < endTime) {
    const currentEndTime = new Date(currentStartTime.getTime() + duration);
    intervals.push({
      start: currentStartTime.toLocaleTimeString([], {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      }),
      end: currentEndTime.toLocaleTimeString([], {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      }),
    });
    currentStartTime = currentEndTime;
  }

  return intervals;
}
