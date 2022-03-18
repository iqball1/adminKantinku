import FIREBASE from "../config/FIREBASE";
import { dispatchError, dispatchLoading, dispatchSuccess } from "../utils";

export const GET_LIST_KATEGORI = "GET_LIST_KATEGORI";
export const TAMBAH_KATEGORI = "TAMBAH_KATEGORI";
export const GET_DETAIL_KATEGORI = "GET_DETAIL_KATEGORI";
export const UPDATE_KATEGORI = "UPDATE_KATEGORI";
export const DELETE_KATEGORI = "DELETE_KATEGORI";

export const getListKategori = () => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_LIST_KATEGORI);

    FIREBASE.database()
      .ref("kategori")
      .once("value", (querySnapshot) => {
        //Hasil
        let data = querySnapshot.val();

        dispatchSuccess(dispatch, GET_LIST_KATEGORI, data);
      })
      .catch((error) => {
        dispatchError(dispatch, GET_LIST_KATEGORI, error);
        alert(error);
      });
  };
};

export const getDetailKategori = (id) => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_DETAIL_KATEGORI);

    FIREBASE.database()
      .ref("kategori/" + id)
      .once("value", (querySnapshot) => {
        //Hasil
        let data = querySnapshot.val();

        dispatchSuccess(dispatch, GET_DETAIL_KATEGORI, data);
      })
      .catch((error) => {
        dispatchError(dispatch, GET_DETAIL_KATEGORI, error);
        alert(error);
      });
  };
};

export const tambahKategori = (data) => {
  return (dispatch) => {
    dispatchLoading(dispatch, TAMBAH_KATEGORI);

    //upload ke storage firebase
    var uploadTask = FIREBASE.storage()
      .ref("kategori")
      .child(data.imageToDB.name)
      .put(data.imageToDB);

    uploadTask.on(
      "state_changed",
      function (snapshot) {
        console.log(snapshot);
      },
      function (error) {
        console.log(error);
      },
      function () {
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          const dataBaru = {
            namaKategori: data.namaKategori,
            image: downloadURL,
          };
          FIREBASE.database()
            .ref("kategori")
            .push(dataBaru)
            .then((response) => {
              dispatchSuccess(
                dispatch,
                TAMBAH_KATEGORI,
                response ? response : []
              );
            })
            .catch((error) => {
              dispatchError(dispatch, TAMBAH_KATEGORI, error);
              alert(error);
            });
        });
      }
    );
  };
};

export const updateKategori = (data) => {
  return (dispatch) => {
    dispatchLoading(dispatch, UPDATE_KATEGORI);

    //Cek apakah gambar diganti
    if (data.imageToDB) {
      //ambil file gambar lama dari firebase storage
      var desertRef = FIREBASE.storage().refFromURL(data.imageLama);

      // hapus gambar lama dari firebase storage
      desertRef
        .delete()
        .then(function () {
          //upload gambar yang baru
          var uploadTask = FIREBASE.storage()
            .ref("kategori")
            .child(data.imageToDB.name)
            .put(data.imageToDB);

          uploadTask.on(
            "state_changed",
            function (snapshot) {
              console.log(snapshot);
            },
            function (error) {
              console.log(error);
            },
            function () {
              uploadTask.snapshot.ref
                .getDownloadURL()
                .then(function (downloadURL) {
                  const dataBaru = {
                    namaKategori: data.namaKategori,
                    image: downloadURL,
                  };

                  FIREBASE.database()
                    .ref("kategori/" + data.id)
                    .update(dataBaru)
                    .then((response) => {
                      dispatchSuccess(
                        dispatch,
                        UPDATE_KATEGORI,
                        response ? response : []
                      );
                    })
                    .catch((error) => {
                      dispatchError(dispatch, UPDATE_KATEGORI, error);
                      alert(error);
                    });
                });
            }
          );
        })
        .catch(function (error) {
          dispatchError(dispatch, UPDATE_KATEGORI, error);
          alert(error);
        });
    } else {
      const dataBaru = {
        namaKategori: data.namaKategori,
        image: data.image,
      };

      FIREBASE.database()
        .ref("kategori/" + data.id)
        .update(dataBaru)
        .then((response) => {
          dispatchSuccess(dispatch, UPDATE_KATEGORI, response ? response : []);
        })
        .catch((error) => {
          dispatchError(dispatch, UPDATE_KATEGORI, error);
          alert(error);
        });
    }
  };
};

export const deleteKategori = (image, id) => {
  return (dispatch) => {
    dispatchLoading(dispatch, DELETE_KATEGORI);

    //Hapus gambar dari storage
    var desertRef = FIREBASE.storage().refFromURL(image);

    // Delete the file
    desertRef
      .delete()
      .then(function () {
        //hapus juga data di realtime database
        FIREBASE.database()
          .ref("kategori/" + id)
          .remove()
          .then(() => {
            dispatchSuccess(
              dispatch,
              DELETE_KATEGORI,
              "Kategori Sukses Dihapus"
            );
          })
          .catch((error) => {
            dispatchError(dispatch, DELETE_KATEGORI, error);
            alert(error);
          });
      })
      .catch(function (error) {
        // Uh-oh, an error occurred!
        dispatchError(dispatch, DELETE_KATEGORI, error);
        alert(error);
      });
  };
};
