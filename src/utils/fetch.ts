import { decrementDateByNumOfDays } from "utils";
import { NUM_OF_MS_IN_ONE_S } from "constants_";

export const getHistoryPath = (
  lat: number,
  lon: number,
  daysBeforeToday: number
) => {
  const timeStamp = Math.round(
    decrementDateByNumOfDays(new Date(), daysBeforeToday).getTime() /
      NUM_OF_MS_IN_ONE_S
  );
  return `/timemachine?lat=${lat}&lon=${lon}&dt=${timeStamp}`;
};
