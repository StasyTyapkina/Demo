import {mainReducer, getRandomActivity} from "../mainSlice"

let startState, mockData

beforeEach(() => {
	startState = {
		randomActivity: {},
		isLoadingRandomActivity: "idle",
	}

	mockData = {
		activity: "Volunteer at a local animal shelter",
		type: "charity",
		participants: 1,
		price: 0.1,
		key: "1382389",
		accessibility: 0.5,
	}
})

describe("getRandomActivity testing", () => {
	it("should set isLoadingRandomActivity to 'pending' at the time of request to the server", () => {
		const action = getRandomActivity.pending
		const endState = mainReducer(startState, action)
		expect(endState.isLoadingRandomActivity).toEqual("pending")
	})

	it("should set isLoadingRandomActivity to 'succeeded', write data to 'randomActivity'", () => {
		const action = getRandomActivity.fulfilled(mockData)
		const endState = mainReducer(startState, action)
		expect(endState.isLoadingRandomActivity).toEqual("succeeded")
		expect(endState.randomActivity.type).toEqual("charity")
		expect(endState.randomActivity.participants).toBe(1)
	})

	it("should set isLoadingRandomActivity to 'failed'", () => {
		const action = getRandomActivity.rejected
		const endState = mainReducer(startState, action)
		expect(endState.isLoadingRandomActivity).toEqual("failed")
	})
})
