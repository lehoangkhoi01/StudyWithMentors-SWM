import { format, parse } from "date-fns";

export const convetDateFormat = (date, from, to) => {
  const fromDateFormat = parse(date, from, new Date());

  return format(fromDateFormat, to);
};
