// const options = {
//     timeZone: 'Africa/Lagos', // WAT time zone
//     hour12: false, // Use 24-hour format
//     hour: '2-digit',
//     minute: '2-digit',
//     second: '2-digit'
// };

// const formattedDate = new Date(createdAt).toLocaleTimeString('en-US', options);
// const currentUTCTime = new Date().toLocaleTimeString('en-US', options);
// console.log((currentUTCTime - formattedDate), "ago");
export const FormatTimeDifference = (createdAt: any) => {
  const createdAtTime: any = new Date(createdAt);
  const currentTime: any = new Date();
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
