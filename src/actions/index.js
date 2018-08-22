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
  FETCH_USER_BOOKINGS_INIT,
  UPDATE_RENTAL_SUCCESS,
  UPDATE_RENTAL_FAIL,
  RESET_RENTAL_ERRORS,
  RELOAD_MAP,
  RELOAD_MAP_FINISH
} from "./types";

// Rental Actions
const axiosInstance = axiosService.getInstance();

export const reloadMap = () => {
  return {
    type: RELOAD_MAP
  };
};

export const reloadMapFinish = () => {
  return {
    type: RELOAD_MAP_FINISH
  };
};

export const fetchRentalByIdInit = () => {
  //Used to clear data
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

const fetchRentalsInit = () => {
  //Used to empty out data
  return {
    type: FETCH_RENTALS_INIT
  };
};

const fetchRentalsFail = errors => {
  return {
    type: FETCH_RENTALS_FAIL,
    errors
  };
};

export const fetchRentals = city => dispatch => {
  const url = city ? `/rentals?city=${city}` : "/rentals";
  dispatch(fetchRentalsInit());

  axiosInstance
    .get(url)
    .then(({ data }) => dispatch(fetchRentalsSuccess(data)))
    .catch(({ response }) => dispatch(fetchRentalsFail(response.data.errors)));
};

export const fetchRentalById = rentalId => dispatch => {
  dispatch(fetchRentalByIdInit());
  axios.get(`/api/v1/rentals/${rentalId}`).then(({ data }) => {
    dispatch(fetchRentalByIdSuccess(data));
  });
};

export const createRental = rentalData => {
  return axiosInstance
    .post("/rentals", rentalData)
    .then(res => res.data)
    .catch(err => {
      return Promise.reject(err.response.data.errors);
    });
};

export const resetRentalErrors = () => {
  return {
    type: RESET_RENTAL_ERRORS
  };
};

const updateRentalSuccess = updatedRental => {
  return {
    type: UPDATE_RENTAL_SUCCESS,
    rental: updatedRental
  };
};

const updateRentalFail = errors => {
  return {
    type: UPDATE_RENTAL_FAIL,
    errors
  };
};

export const updateRental = (id, rentalData) => dispatch => {
  return axiosInstance
    .patch(`/rentals/${id}`, rentalData)
    .then(({ data }) => {
      dispatch(updateRentalSuccess(data));

      if (rentalData.city || rentalData.street) {
        dispatch(reloadMap());
      }
    })
    .then(updatedRental => {})
    .catch(({ response }) => dispatch(updateRentalFail(response.data.errors)));
};

// USER BOOKINGS ACTIONS ---------------------------
const fetchUserBookingsInit = () => {
  return {
    type: FETCH_USER_BOOKINGS_INIT
  };
};

const fetchUserBookingsSuccess = userBookings => {
  return {
    type: FETCH_USER_BOOKINGS_SUCCESS,
    userBookings
  };
};

const fetchUserBookingsFail = errors => {
  return {
    type: FETCH_USER_BOOKINGS_FAIL,
    errors
  };
};

export const fetchUserBookings = () => {
  return dispatch => {
    dispatch(fetchUserBookingsInit());

    axiosInstance
      .get("/bookings/manage")
      .then(res => res.data)
      .then(userBookings => dispatch(fetchUserBookingsSuccess(userBookings)))
      .catch(({ response }) =>
        dispatch(fetchUserBookingsFail(response.data.errors))
      );
  };
};

// USER RENTALS ACTIONS ---------------------------
export const getUserRentals = () => {
  return axiosInstance
    .get("/rentals/manage")
    .then(res => res.data)
    .catch(err => Promise.reject(err.response.data.errors));
};

export const deleteRental = rentalId => {
  return axiosInstance
    .delete(`/rentals/${rentalId}`)
    .then(res => res.data)
    .catch(err => Promise.reject(err.response.data.errors));
};

// Auth Actions
const loginSuccess = () => {
  const username = authService.getUsername();

  return {
    type: LOGIN_SUCCESS,
    username
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

export const createBooking = booking => {
  return axiosInstance
    .post("/bookings", booking)
    .then(res => res.data)
    .catch(({ response }) => Promise.reject(response.data.errors));
};
