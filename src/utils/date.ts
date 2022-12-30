export const decrementDateByNumOfDays = (date: Date, numOfDays: number) =>
  new Date(date.getTime() - 86400000 * numOfDays);
