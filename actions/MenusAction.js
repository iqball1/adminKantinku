import FIREBASE from "../config/FIREBASE";
import { dispatchError, dispatchLoading, dispatchSuccess } from "../utils";

export const GET_LIST_MENUS = "GET_LIST_MENUS";
export const UPLOAD_MENUS = "UPLOAD_MENUS";
export const TAMBAH_MENUS = "TAMBAH_MENUS";
export const GET_DETAIL_MENUS = "GET_DETAIL_MENUS";
export const UPDATE_MENUS = "UPDATE_MENUS";
export const DELETE_MENUS = "DELETE_MENUS";

export const getListMenu = () => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_LIST_MENUS);

    FIREBASE.database()
      .ref("menus")
      .once("value", (querySnapshot) => {
        //Hasil
        let data = querySnapshot.val();

        dispatchSuccess(dispatch, GET_LIST_MENUS, data);
      })
      .catch((error) => {
        dispatchError(dispatch, GET_LIST_MENUS, error);
        alert(error);
      });
  };
};

export const getDetailMenu = (id) => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_DETAIL_MENUS);

    FIREBASE.database()
      .ref("menus/" + id)
      .once("value", (querySnapshot) => {
        //Hasil
        let data = querySnapshot.val();

        dispatchSuccess(dispatch, GET_DETAIL_MENUS, data);
      })
      .catch((error) => {
        dispatchError(dispatch, GET_DETAIL_MENUS, error);
        alert(error);
      });
  };
};

export const uploadMenu = (gambar, imageToDB) => {
  return (dispatch) => {
    dispatchLoading(dispatch, UPLOAD_MENUS);

    //upload ke storage firebase
    var uploadTask = FIREBASE.storage()
      .ref("menus/")
      .child(gambar.name)
      .put(gambar);

    uploadTask.on(
      "state_changed",
      function (snapshot) {
        console.log(snapshot);
      },
      function (error) {
        dispatchError(dispatch, UPLOAD_MENUS, error);
      },
      function () {
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          const dataBaru = {
            image: downloadURL,
            imageToDB: imageToDB,
          };

          dispatchSuccess(dispatch, UPLOAD_MENUS, dataBaru);
        });
      }
    );
  };
};

export const tambahMenu = (data) => {
  return (dispatch) => {
    dispatchLoading(dispatch, TAMBAH_MENUS);

    const dataBaru = {
      gambar: data.imageToDB1,
      nama: data.nama,
      harga: data.harga,
      jenis: data.jenis,
      ready: data.ready,
      kategori: data.kategori,
      keterangan:data.keterangan
    };

    FIREBASE.database()
      .ref("menus/" + data.id)
      .push(dataBaru)
      .then((response) => {
        dispatchSuccess(dispatch, TAMBAH_MENUS, response);
      })
      .catch((error) => {
        dispatchError(dispatch, TAMBAH_MENUS, error);
        alert(error);
      });
  };
};

export const updateMenu = (data) => {
  return (dispatch) => {
    dispatchLoading(dispatch, UPDATE_MENUS);

    const dataBaru = {
      gambar: data.imageToDB1 ? data.imageToDB1 : data.imageLama1,
      nama: data.nama,
      harga: data.harga,
      jenis: data.jenis,
      ready: data.ready,
      kategori: data.kategori,
      keterangan:data.keterangan
    };

    FIREBASE.database()
      .ref("menus/" + data.id)
      .update(dataBaru)
      .then((response) => {
        if (data.imageToDB1) {
          var desertRef = FIREBASE.storage().refFromURL(data.imageLama1);
          desertRef.delete().catch(function (error) {
            dispatchError(dispatch, UPDATE_MENUS, error);
          });
        }

        if (data.imageToDB2) {
          var desertRef2 = FIREBASE.storage().refFromURL(data.imageLama2);
          desertRef2.delete().catch(function (error) {
            dispatchError(dispatch, UPDATE_MENUS, error);
          });
        }

        dispatchSuccess(dispatch, UPDATE_MENUS, "Update Menu Sukses");
      })
      .catch((error) => {
        dispatchError(dispatch, UPDATE_MENUS, error);
        alert(error);
      });
  };
};

export const deleteMenu = (images, id) => {
  return (dispatch) => {
    dispatchLoading(dispatch, DELETE_MENUS);

    var desertRef = FIREBASE.storage().refFromURL(images);
    desertRef
      .delete()
      .then(function () {
        //hapus realtime database
        FIREBASE.database()
          .ref("menus/" + id)
          .remove()
          .then(function () {
            dispatchSuccess(dispatch, DELETE_MENUS, "Menu Berhasil diHapus");
          })
          .catch(function (error) {
            dispatchError(dispatch, DELETE_MENUS, error);
          });
      })
      .catch(function (error) {
        dispatchError(dispatch, DELETE_MENUS, error);
      });
  };
};
