import {
  GET_LIST_MENUS,
  UPLOAD_MENUS,
  TAMBAH_MENUS,
  GET_DETAIL_MENUS,
  UPDATE_MENUS,
  DELETE_MENUS,
} from "../../actions/MenusAction";

const initialState = {
  getListMenuLoading: false,
  getListMenuResult: false,
  getListMenuError: false,

  uploadMenuLoading: false,
  uploadMenuResult: false,
  uploadMenuError: false,

  tambahMenuLoading: false,
  tambahMenuResult: false,
  tambahMenuError: false,

  getDetailMenuLoading: false,
  getDetailMenuResult: false,
  getDetailMenuError: false,

  updateMenuLoading: false,
  updateMenuResult: false,
  updateMenuError: false,

  deleteMenuLoading: false,
  deleteMenuResult: false,
  deleteMenuError: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_LIST_MENUS:
      return {
        ...state,
        getListMenuLoading: action.payload.loading,
        getListMenuResult: action.payload.data,
        getListMenuError: action.payload.errorMessage,
      };

    case UPLOAD_MENUS:
      return {
        ...state,
        uploadMenuLoading: action.payload.loading,
        uploadMenuResult: action.payload.data,
        uploadMenuError: action.payload.errorMessage,
      };

    case TAMBAH_MENUS:
      return {
        ...state,
        tambahMenuLoading: action.payload.loading,
        tambahMenuResult: action.payload.data,
        tambahMenuError: action.payload.errorMessage,
      };

    case GET_DETAIL_MENUS:
      return {
        ...state,
        getDetailMenuLoading: action.payload.loading,
        getDetailMenuResult: action.payload.data,
        getDetailMenuError: action.payload.errorMessage,
      };

    case UPDATE_MENUS:
      return {
        ...state,
        updateMenuLoading: action.payload.loading,
        updateMenuResult: action.payload.data,
        updateMenuError: action.payload.errorMessage,
      };

    case DELETE_MENUS:
      return {
        ...state,
        deleteMenuLoading: action.payload.loading,
        deleteMenuResult: action.payload.data,
        deleteMenuError: action.payload.errorMessage,
      };
    default:
      return state;
  }
}
