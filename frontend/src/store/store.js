import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/index.js";
import productSlice from "./admin/index.js";
import CartSlice from "./userView/cart/index.js";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import ShopProductSlice from "../store/userView/index.js";
import Address_Slice from "../store/userView/address/index.js";
import OrderSlice from "../store/userView/orderSlice/index.js"
import AdminOrders from '../store/admin/orderSlice/index.js'
import SearchProducts from '../store/userView/searchProducts/index.js'
import ReviewSlice from '../store/userView/Review/index.js'
import FeatureImageSlice from '../store/userView/featureImages/index.js'

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  auth: authSlice,
  products: productSlice, // admin side products
  adminorders : AdminOrders,

  shopProducts: ShopProductSlice, // user side products
  cartItems: CartSlice,
  address: Address_Slice,
  order : OrderSlice,
  search : SearchProducts,
  review : ReviewSlice,
  feature : FeatureImageSlice // admin side
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
