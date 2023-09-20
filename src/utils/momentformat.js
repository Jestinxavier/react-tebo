import moment from 'moment';

export const  formatDateToYYYYMMDD = (date)=> {
  // Convert the date to a Moment.js instance
  const momentDate = moment(date);

  // Format the date in the desired format
  const formattedDate = momentDate.format('YYYY-MM-DD');

  return formattedDate;
}

export const  regularFormatDate = (date)=> {
  // Convert the date to a Moment.js instance
  const momentDate = moment(date,'YYYY-MM-DD').toDate();
  return momentDate;
}

// // Usage example
// const yourDate = new Date(); // Replace this with your actual date
// const formattedDate = formatDateToYYYYMMDD(yourDate);
// console.log(formattedDate); // Output: "YYYY-MM-DD"
