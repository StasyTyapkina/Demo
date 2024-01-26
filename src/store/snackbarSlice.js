import {createSlice} from "@reduxjs/toolkit"

const initialState = {
	isVisible: false,
	notificationMessage: "",
	notificationType: "",
}

const snackbarSlice = createSlice({
	name: "snackbar",
	initialState,
	reducers: {
		setSnackbarNotification: (state, action) => {
			state.isVisible = true
			state.notificationMessage = action.payload.message
			state.notificationType = action.payload.type
		},
		clearSnackbarNotification: (state) => {
			state.isVisible = false
			state.notificationMessage = ""
			state.notificationType = ""
		},
	},
	extraReducers: () => {},
})

export const {setSnackbarNotification, clearSnackbarNotification} = snackbarSlice.actions

export const snackbarReducer = snackbarSlice.reducer
