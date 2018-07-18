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

const rentals = [
  {
    id: 1,
    title: "Central Apartment",
    city: "New York",
    street: "Times Sqaure",
    category: "apartment",
    image: "http://via.placeholder.com/350x250",
    bedrooms: 3,
    description: "Very nice apartment",
    dailyRate: 34,
    shared: false,
    createdAt: "24/12/2017"
  },
  {
    id: 2,
    title: "Central Apartment 2",
    city: "San Francisco",
    street: "Main street",
    category: "condo",
    image: "http://via.placeholder.com/350x250",
    bedrooms: 2,
    description: "Very nice apartment",
    dailyRate: 12,
    shared: true,
    createdAt: "24/12/2017"
  },
  {
    id: 3,
    title: "Central Apartment 3",
    city: "Bratislava",
    street: "Hlavna",
    category: "condo",
    image: "http://via.placeholder.com/350x250",
    bedrooms: 2,
    description: "Very nice apartment",
    dailyRate: 334,
    shared: true,
    createdAt: "24/12/2017"
  },
  {
    id: 4,
    title: "Central Apartment 4",
    city: "Berlin",
    street: "Haupt strasse",
    category: "house",
    image: "http://via.placeholder.com/350x250",
    bedrooms: 9,
    description: "Very nice apartment",
    dailyRate: 33,
    shared: true,
    createdAt: "24/12/2017"
  }
];

export const fetchRentals = city => {
  // const url = city ? `/rentals?city=${city}` : "/rentals";
  // return dispatch => {
  //   dispatch(fetchRentalsInit());
  //   axiosInstance
  //     .get(url)
  //     .then(res => res.data)
  //     .then(rentals => dispatch(fetchRentalsSuccess(rentals)))
  //     .catch(({ response }) =>
  //       dispatch(fetchRentalsFail(response.data.errors))
  //     );
  // };
  return { type: "YO" };
};

export const fetchRentalById = rentalId => {
  // return function(dispatch) {
  //   dispatch(fetchRentalByIdInit());
  //   axios
  //     .get(`/api/v1/rentals/${rentalId}`)
  //     .then(res => res.data)
  //     .then(rental => dispatch(fetchRentalByIdSuccess(rental)));
  // };
  return { type: "YO" };
};
