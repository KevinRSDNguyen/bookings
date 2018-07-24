import titleize from "titleize"; //This lib uppercases first let of each word
import * as moment from "moment";

export const rentalType = isShared => (isShared ? "shared" : "entire");
export const toUpperCase = value => (value ? titleize(value) : "");

export const pretifyDate = date => moment(date).format("MMM Do YY");

export const getRangeOfDates = (startAt, endAt, dateFormat = "Y/MM/DD") => {
  debugger;
  const tempDates = [];
  const mEndAt = moment(endAt);
  let mStartAt = moment(startAt);
  debugger;
  while (mStartAt < mEndAt) {
    tempDates.push(mStartAt.format(dateFormat));
    mStartAt = mStartAt.add(1, "day");
  }

  tempDates.push(mEndAt.format(dateFormat));

  return tempDates;
};
