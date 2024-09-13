import moment from "moment/moment";
export const getCurrentDate = (timeFormat) => {
  return moment().format(timeFormat);
};
