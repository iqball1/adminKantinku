import swal from "sweetalert";
import FIREBASE from "../config/FIREBASE";
import { dispatchError, dispatchLoading, dispatchSuccess } from "../utils";

export const UPDATE_USER = "UPDATE_USER";
export const UPDATE_USER_AKTIF = "UPDATE_USER";

export const updateStatus = (uid) => {
  return (dispatch) => {
    // LOADING
    dispatchLoading(dispatch, UPDATE_USER);
    FIREBASE.database()
      .ref("users/" + uid)
      .update({ status: "nonaktif" })
      .then(function () {
        dispatchSuccess(dispatch, UPDATE_USER, "User diNonAktifkan");
      })
      .catch(function (error) {
        dispatchError(dispatch, UPDATE_USER, error);
      })
      .catch((error) => {
        // ERROR
        dispatchError(dispatch, UPDATE_USER, error.message);

        alert(error.message);
      });
  };
};
export const updateStatusAktif = (uid) => {
  return (dispatch) => {
    // LOADING
    dispatchLoading(dispatch, UPDATE_USER_AKTIF);
    FIREBASE.database()
      .ref("users/" + uid)
      .update({ status: "user" })
      .then(function () {
        dispatchSuccess(dispatch, UPDATE_USER_AKTIF, "User diAktifkan");
      }).catch((error) => {
      // ERROR
      dispatchError(dispatch, UPDATE_USER_AKTIF, error.message);
      alert(error);
    })
  };
};
