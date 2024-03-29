import {
  Dashboard,
  EditKategori,
  ListKategori,
  TambahKategori,
  TambahMenu,
  EditJersey,
  ListPesanan,
  ListMenu,
  ListUser,
  ListUserDetail,
} from "./views";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin",
    sidebar: true,
  },
  {
    path: "/Kategori",
    name: "Master Kategori",
    icon: "nc-icon nc-tile-56",
    component: ListKategori,
    layout: "/admin",
    sidebar: true,
  },
  {
    path: "/Kategori/tambah",
    name: "Tambah Kategori",
    component: TambahKategori,
    layout: "/admin",
    sidebar: false,
  },
  {
    path: "/Kategori/edit/:id",
    name: "Edit Kategori",
    component: EditKategori,
    layout: "/admin",
    sidebar: false,
  },
  {
    path: "/Menu",
    name: "Master Menu",
    icon: "nc-icon nc-paper",
    component: ListMenu,
    layout: "/admin",
    sidebar: true,
  },
  {
    path: "/Menu/tambah",
    name: "Tambah Menu",
    component: TambahMenu,
    layout: "/admin",
    sidebar: false,
  },
  {
    path: "/Menu/edit/:id",
    name: "Edit Menu",
    component: EditJersey,
    layout: "/admin",
    sidebar: false,
  },
  {
    path: "/pesanan",
    name: "Master Pesanan",
    icon: "nc-icon nc-cart-simple",
    component: ListPesanan,
    layout: "/admin",
    sidebar: true,
  },
  {
    path: "/DataUser",
    name: "Data User",
    icon: "nc-icon nc-single-copy-04",
    component: ListUser,
    layout: "/admin",
    sidebar: true,
  },
  {
    path: "/DataUser/ListDetailUser",
    name: "List Detail User",
    icon: "nc-icon nc-single-copy-04",
    component: ListUserDetail,
    layout: "/admin",
    sidebar: false,
  },
];
export default routes;
