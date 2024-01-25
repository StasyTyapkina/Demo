import {configureStore} from "@reduxjs/toolkit"
import {snackbarReducer} from "./snackbarSlice"
import {todosReducer} from "./todosSlice"
import {mainReducer} from "./mainSlice"

export const store = configureStore({
	reducer: {
		snackbar: snackbarReducer,
		todos: todosReducer,
		main: mainReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
})

window.store = store
