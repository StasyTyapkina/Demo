import {clearSnackbarNotification, snackbarReducer, setSnackbarNotification} from "../snackbarSlice.js"

let startState

beforeEach(() => {
	startState = {
		isVisible: false,
		notificationMessage: "",
		notificationType: "",
	}
})

describe("notificationSlice testing", () => {
	it("testing setting message and type in state", () => {
		const action = setSnackbarNotification({message: "Error.Failed", type: "error"})
		const endState = snackbarReducer(startState, action)
		expect(endState.notificationMessage).toEqual("Error.Failed")
		expect(endState.notificationType).toEqual("error")
		expect(endState.isVisible).toEqual(true)
	})
	it("notification clearing testing", () => {
		const action = clearSnackbarNotification()
		const endState = snackbarReducer(startState, action)
		expect(endState.notificationMessage).toEqual("")
		expect(endState.notificationType).toEqual("")
		expect(endState.isVisible).toEqual(false)
	})
})
