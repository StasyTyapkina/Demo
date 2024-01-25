import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import {setSnackbarNotification} from "./snackbarSlice"
import {mainAPI} from "../pages/Main/API/mainAPI"

const initialState = {
	randomActivity: {},
	isLoadingRandomActivity: "idle",
}

export const getRandomActivity = createAsyncThunk("main/getRandomActivity", async (_, thunkAPI) => {
	try {
		const res = await mainAPI.getRandomActivity()
		return res.data
	} catch (err) {
		thunkAPI.dispatch(setSnackbarNotification({message: "Error", type: "error"}))
		return thunkAPI.rejectWithValue("Error")
	}
})

const mainSlice = createSlice({
	name: "main",
	initialState,

	extraReducers: (builder) => {
		builder.addCase(getRandomActivity.fulfilled, (state, action) => {
			state.randomActivity = action.payload
			state.isLoadingRandomActivity = "succeeded"
		})
		builder.addCase(getRandomActivity.pending, (state) => {
			state.isLoadingRandomActivity = "pending"
		})
		builder.addCase(getRandomActivity.rejected, (state) => {
			state.isLoadingRandomActivity = "failed"
		})
	},
})

export const mainReducer = mainSlice.reducer
