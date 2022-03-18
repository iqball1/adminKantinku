import swal from "sweetalert";
import FIREBASE from "../config/FIREBASE";
import { dispatchError, dispatchLoading, dispatchSuccess } from "../utils";

export const LOGIN_USER = "LOGIN_USER";
export const CHECK_LOGIN = "CHECK_LOGIN";
export const LOGOUT = "LOGOUT";
export const REGISTER_USER = "REGISTER_USER";
export const GET_LIST_USERS = "GET_LIST_USERS";
export const GET_DETAIL_USERS = "GET_DETAIL_USERS";
export const DELETE_USERS = "DELETE_USERS";
export const UPDATE_USER = 'UPDATE_USER'

export const loginUser = (email, password) => {
  return (dispatch) => {
    dispatchLoading(dispatch, LOGIN_USER);

    FIREBASE.auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        FIREBASE.database()
          .ref(`admin/${res.user.uid}`)
          .once("value")
          .then((resDB) => {
            // Signed in
            if (resDB.val()) {
              if (resDB.val().status === "admin") {
                window.localStorage.setItem(
                  "admin",
                  JSON.stringify(resDB.val())
                );
                dispatchSuccess(dispatch, LOGIN_USER, resDB.val());
              } else {
                dispatchError(dispatch, LOGIN_USER, "Anda Bukan Admin");
                swal("Failed", "Anda Bukan Admin", "error");
              }
            }
          })
          .catch((error) => {
            dispatchError(dispatch, LOGIN_USER, error);
            swal("Failed", error, "error");
          });
      })
      .catch((error) => {
        var errorMessage = error.message;

        dispatchError(dispatch, LOGIN_USER, errorMessage);
        swal("Failed", errorMessage, "error");
      });
  };
};

export const checkLogin = (history) => {
  return (dispatch) => {
    dispatchLoading(dispatch, CHECK_LOGIN);

    if (window.localStorage.getItem("admin")) {
      const user = JSON.parse(window.localStorage.getItem("admin"));

      FIREBASE.database()
        .ref(`admin/${user.uid}`)
        .once("value")
        .then((resDB) => {
          if (resDB.val()) {
            if (resDB.val().status === "admin") {
              dispatchSuccess(dispatch, CHECK_LOGIN, resDB.val());
            } else {
              dispatchError(dispatch, CHECK_LOGIN, "Anda Bukan Admin");
              history.push({ pathname: "/login" });
            }
          } else {
            dispatchError(dispatch, CHECK_LOGIN, "Anda Bukan Admin");
            history.push({ pathname: "/login" });
          }
        })
        .catch((error) => {
          dispatchError(dispatch, CHECK_LOGIN, error);
          history.push({ pathname: "/login" });
        });
    } else {
      dispatchError(dispatch, CHECK_LOGIN, "Belum Login");
      history.push({ pathname: "/login" });
    }
  };
};

export const logOutUser = (history) => {
  return (dispatch) => {
    dispatchLoading(dispatch, LOGOUT);

    FIREBASE.auth()
      .signOut()
      .then((res) => {
        window.localStorage.removeItem("admin");
        dispatchSuccess(dispatch, LOGOUT, res);
        history.push({ pathname: "/login" });
      })
      .catch((error) => {
        dispatchError(dispatch, LOGOUT, error.message);
        swal("Failed!", error.message, "error");
      });
  };
};

export const registerUser = (data, password) => {
  return (dispatch) => {
    // LOADING
    dispatchLoading(dispatch, REGISTER_USER);

    FIREBASE.auth()
      .createUserWithEmailAndPassword(data.email, password)
      .then((success) => {
        const dataBaru = {
          ...data,
          uid: success.user.uid,
        };
        // REALTIME DB
        FIREBASE.database()
          .ref("admin/idadmin/" + success.user.uid)
          .set(dataBaru);

        // SUCCESS
        dispatchSuccess(dispatch, REGISTER_USER, dataBaru);
      })
      .catch((error) => {
        // ERROR
        dispatchError(dispatch, REGISTER_USER, error.message);

        alert(error.message);
      });
  };
};

export const getListUser = () => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_LIST_USERS);

    FIREBASE.database()
      .ref("users")
      .once("value", (querySnapshot) => {
        let data = querySnapshot.val();

        dispatchSuccess(dispatch, GET_LIST_USERS, data);
      })
      .catch((error) => {
        dispatchError(dispatch, GET_LIST_USERS, error);
        alert(error);
      });
  };
};

export const getDetailUser = (uid) => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_DETAIL_USERS);

    FIREBASE.database()
      .ref("users/" + uid)
      .once("value", (querySnapshot) => {
        //Hasil
        let data = querySnapshot.val();

        dispatchSuccess(dispatch, GET_DETAIL_USERS, data);
      })
      .catch((error) => {
        dispatchError(dispatch, GET_DETAIL_USERS, error);
        alert(error);
      });
  };
};

export const deleteUsers = (uid) => {
  return (dispatch) => {
    dispatchLoading(dispatch, DELETE_USERS);
  
    FIREBASE.database()
      .ref("users/"+uid)
      .remove()
      .then(function () {
        dispatchSuccess(dispatch, DELETE_USERS, "User berhasil diHapus");
      })
      .catch(function (error) {
        dispatchError(dispatch, DELETE_USERS, error);
      })

  };
};
