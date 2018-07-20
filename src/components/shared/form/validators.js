//If the value is valid, the validation function should return undefined.
//If the value is invalid, the validation function should return an error.
//This is usually a string, but it does not have to be.

const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined;

export const minLength4 = minLength(4);

export const required = value =>
  value ? undefined : "This input is required!";
