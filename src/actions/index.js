import axios from "axios";
import authService from "services/auth-service";
import axiosService from "services/axios-service";

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
const axiosInstance = axiosService.getInstance();

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
  axiosInstance.get(`/rentals`).then(({ data }) => {
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
const loginSuccess = () => {
  return {
    type: LOGIN_SUCCESS
  };
};

const loginFailure = errors => {
  return {
    type: LOGIN_FAILURE,
    errors
  };
};

export const login = userData => dispatch => {
  return axios
    .post("/api/v1/users/auth", userData)
    .then(res => res.data)
    .then(token => {
      authService.saveToken(token);
      dispatch(loginSuccess());
    })
    .catch(({ response }) => {
      dispatch(loginFailure(response.data.errors));
    });
};

export const logout = () => {
  authService.invalidateUser(); // Clear local storage

  return {
    type: LOGOUT
  };
};

export const register = userData => {
  return axios
    .post("/api/v1/users/register", userData)
    .then(res => res.data, err => Promise.reject(err.response.data.errors));
  //2nd arg to .then is run in case of err. Alt to .catch()
};

export const checkAuthState = () => dispatch => {
  if (authService.isAuthenticated()) {
    dispatch(loginSuccess());
  }
};
