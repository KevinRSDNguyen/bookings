import axios from "axios";

import {
  FETCH_RENTAL_BY_ID_SUCCESS,
  FETCH_RENTAL_BY_ID_INIT,
  FETCH_RENTALS_SUCCESS,
  FETCH_RENTALS_INIT,
  FETCH_RENTALS_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  FETCH_USER_BOOKINGS_SUCCESS,
  FETCH_USER_BOOKINGS_FAIL,
  FETCH_USER_BOOKINGS_INIT
} from "./types";

// Rental Actions
export const fetchRentalByIdInit = () => {
  return {
    type: FETCH_RENTAL_BY_ID_INIT
  };
};

export const fetchRentalByIdSuccess = rental => {
  return {
    type: FETCH_RENTAL_BY_ID_SUCCESS,
    rental
  };
};

const fetchRentalsSuccess = rentals => {
  return {
    type: FETCH_RENTALS_SUCCESS,
    rentals
  };
};

export const fetchRentals = () => dispatch => {
  axios.get(`/api/v1/rentals`).then(({ data }) => {
    dispatch(fetchRentalsSuccess(data));
  });
};

export const fetchRentalById = rentalId => dispatch => {
  dispatch(fetchRentalByIdInit());
  axios.get(`/api/v1/rentals/${rentalId}`).then(({ data }) => {
    dispatch(fetchRentalByIdSuccess(data));
  });
};

// Auth Actions
export const register = userData => {
  return axios
    .post("/api/v1/users/register", userData)
    .then(res => res.data, err => Promise.reject(err.response.data.errors));
  //2nd arg to .then is run in case of err. Alt to .catch()
};
