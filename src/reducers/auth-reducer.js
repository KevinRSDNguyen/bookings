import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from "../actions/types";

const INITIAL_STATE = {
  isAuth: false,
  errors: [],
  username: ""
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuth: true,
        token: action.token,
        errors: [],
        username: action.username
      };
    case LOGIN_FAILURE:
      return { ...state, errors: action.errors };
    case LOGOUT:
      return { ...state, isAuth: false, token: "", username: "" };
    default:
      return state;
  }
};

export default authReducer;
