import { configureStore } from "@reduxjs/toolkit";
import fileReducer from "./fileReducer";
import userReducer from "./userReducer";
import uploadReducer from "./uploadReducer";
import appReducer from "./appReducer";

export const store = configureStore({
	reducer: {
		user: userReducer,
		files: fileReducer,
		upload: uploadReducer,
		app: appReducer
	}
})