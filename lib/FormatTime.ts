// const options = {
//     timeZone: 'Africa/Lagos', // WAT time zone
//     hour12: false, // Use 24-hour format
//     hour: '2-digit',
//     minute: '2-digit',
//     second: '2-digit'
// };

import { minify } from "next/dist/build/swc";

// const formattedDate = new Date(createdAt).toLocaleTimeString('en-US', options);
// const currentUTCTime = new Date().toLocaleTimeString('en-US', options);
// console.log((currentUTCTime - formattedDate), "ago");
export const FormatTimeDifference = (createdAt: any) => {
  const createdAtTime: Date = new Date(createdAt);
  const currentTime: Date = new Date();
  //@ts-ignore
  const timeDifference = Math.abs(currentTime - createdAtTime); // Difference in milliseconds

  // Convert milliseconds to minutes
  const minutesDifference = Math.floor(timeDifference / (1000 * 60));
  // Convert minutes to hours
  const hoursDifference = Math.floor(minutesDifference / 60);

  let formattedTimeDifference;
  if (hoursDifference > 0) {
    return (formattedTimeDifference = `${hoursDifference}hrs ago`);
  } else {
    return (formattedTimeDifference = `${minutesDifference}mins ago`);
  }
};

export const formatTime = (deadline: Date) => {
  const options = {
    timeZone: "Africa/Lagos", // WAT time zone
    hour12: false, // Use 24-hour format
    hour: "2-digit",
    minute: "2-digit",
  };
  //@ts-ignore
  const formattedDate = new Date(deadline).toLocaleTimeString("en-US", options);
  return formattedDate;
};

export const reverseFormatTime = (timeInput: string) => {
  // split the time into hours and mins
  const [hoursStr, minutesStr] = timeInput.split(":");
  const hours = parseInt(hoursStr);
  const minutes = parseInt(minutesStr);

  // get the current date in UTC format
  const currentDate = new Date();
  const currentYear = currentDate.getUTCFullYear();
  const currentMonth = currentDate.getUTCMonth();
  const currentDay = currentDate.getUTCDate();

  // Create a new Date object with the current year, month, day, hours, and minutes
  const utcDate = new Date(
    Date.UTC(currentYear, currentMonth, currentDay, hours, minutes)
  );

  return utcDate.toISOString(); // Return the date in UTC format (ISO string)
};
