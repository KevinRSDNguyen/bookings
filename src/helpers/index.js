import titleize from "titleize"; //This lib uppercases first let of each word

export const rentalType = isShared => (isShared ? "shared" : "entire");
export const toUpperCase = value => (value ? titleize(value) : "");
