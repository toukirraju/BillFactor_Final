import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
import messageReducer from "./slices/message";
import apartmentReducer from "./slices/apartmentSlice";
import renterReducer from "./slices/renterSlice";
import assignReducer from "./slices/assignRenterSlice";
import transactionReducer from "./slices/transactionSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    message: messageReducer,
    // moderator: moderatorReducer,
    moderator: apartmentReducer,
    renterCreator: renterReducer,
    assingRenter: assignReducer,
    transaction: transactionReducer,
  },
});
