import { format, parse } from "date-fns";

export const convertDateFormat = (date, from, to) => {
  const fromDateFormat = parse(date, from, new Date());

  return format(fromDateFormat, to);
};

export const CovertToISODate = (dateFormat, date) => {
  return parse(date, dateFormat, new Date())
}