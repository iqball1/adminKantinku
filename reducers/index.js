import { combineReducers } from 'redux'
import KategoriReducer from './kategori'
import MenuReducer from './menu'
import AuthReducer from './auth'
import PesananReducer from './pesanan'

export default combineReducers({
    KategoriReducer,
    MenuReducer,
    AuthReducer,
    PesananReducer
})