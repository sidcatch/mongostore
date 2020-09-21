import { combineReducers } from "redux";
import auth from "./auth";
import alert from "./alert";
import cart from "./cart";

import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
/* import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2"; */

const authPersistConfig = {
  key: "auth",
  storage: storage,
  /* stateReconciler: autoMergeLevel2, */
  blacklist: ["loading"],
};

export default combineReducers({
  auth: persistReducer(authPersistConfig, auth),
  alert,
  cart,
});
