import {configureStore} from "@reduxjs/toolkit"
import {snackbarReducer} from "./snackbarSlice"
import {todosReducer} from "./todosSlice"

export const store = configureStore({
	reducer: {
		snackbar: snackbarReducer,
		todos: todosReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
})

window.store = store
