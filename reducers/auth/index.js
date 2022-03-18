import { UPDATE_USER_AKTIF } from "actions/DataUser";
import { UPDATE_USER } from "actions/DataUser";
import {
  LOGIN_USER,
  CHECK_LOGIN,
  LOGOUT,
  REGISTER_USER,
  GET_LIST_USERS,
  DELETE_USERS,
  GET_DETAIL_USERS,
} from "../../actions/AuthAction";

const initialState = {
  loginLoading: false,
  loginResult: false,
  loginError: false,

  checkLoginLoading: false,
  checkLoginResult: false,
  checkLoginError: false,

  logOutLoading: false,
  logOutResult: false,
  logOutError: false,

  registerUserLoading: false,
  registerUserResult: false,
  registerUserError: false,

  getListUserLoading: false,
  getListUserResult: false,
  getListUserError: false,

  updateStatusLoading: false,
  updateStatusResult: false,
  updateStatusError: false,

  updateStatusAktifLoading: false,
  updateStatusAktifResult: false,
  updateStatusAktifError: false,

  getDetailUserLoading: false,
  getDatailUserResult: false,
  getDatailUserError: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        loginLoading: action.payload.loading,
        loginResult: action.payload.data,
        loginError: action.payload.errorMessage,
      };

    case CHECK_LOGIN:
      return {
        ...state,
        checkLoginLoading: action.payload.loading,
        checkLoginResult: action.payload.data,
        checkLoginError: action.payload.errorMessage,
      };

    case LOGOUT:
      return {
        ...state,
        logOutLoading: action.payload.loading,
        logOutResult: action.payload.data,
        logOutError: action.payload.errorMessage,
      };
    case REGISTER_USER:
      return {
        ...state,
        registerUserLoading: action.payload.loading,
        registerUserResult: action.payload.data,
        registerUserError: action.payload.errorMessage,
      };
    case GET_LIST_USERS:
      return {
        ...state,
        getListUserLoading: action.payload.loading,
        getListUserResult: action.payload.data,
        getListUserError: action.payload.errorMessage,
      };
    case GET_DETAIL_USERS:
      return {
        ...state,
        getDetailUserLoading: action.payload.loading,
        getDatailUserResult: action.payload.data,
        getDatailUserError: action.payload.errorMessage,
      };
    case UPDATE_USER:
      return {
        ...state,
        updateStatusLoading: action.payload.loading,
        updateStatusResult: action.payload.data,
        updateStatusError: action.payload.errorMessage,
      };
    case UPDATE_USER_AKTIF:
      return {
        ...state,
        updateStatusAktifLoading: action.payload.loading,
        updateStatusAktifResult: action.payload.data,
        updateStatusAktifError: action.payload.errorMessage,
      };
    default:
      return state;
  }
}
