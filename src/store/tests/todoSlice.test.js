import {addTodo, removeTodo, moveTodo, todosReducer} from "../todosSlice"

let startState, mockData

beforeEach(() => {
	startState = {
		tasks: [
			{
				id: "1",
				text: "Task 1",
				column: "TO-DO",
			},
			{
				id: "2",
				text: "Task 2",
				column: "In progress",
			},
			{
				id: "3",
				text: "Task 3",
				column: "Done",
			},
		],
		columnsOrder: ["TO-DO", "In progress", "Done"],
	}

	mockData = {
		id: "4",
		text: "New test task",
		column: "Done",
	}
})

describe("addTodo testing", () => {
	it("new task should be added to tasks state", function () {
		const testState = {
			...startState,
			mockData,
		}
		const action = addTodo(mockData)
		const endState = todosReducer(testState, action)
		expect(endState.tasks).toHaveLength(4)
		expect(endState.tasks[3]).toBeTruthy()
		expect(endState.tasks[3].text).toEqual("New test task")
	})
})

describe("removeTodo testing", () => {
	it("in tasks state the specified task should be deleted", function () {
		const testState = {
			...startState,
			mockData,
		}
		const action = removeTodo(mockData)
		const endState = todosReducer(testState, action)
		expect(endState.tasks).toHaveLength(3)
		expect(endState.tasks[3]).toBeFalsy()
		expect(endState.tasks[2].text).toEqual("Task 3")
	})
})

describe("moveTodo testing", () => {
	it("should move the specified task to the specified destination", function () {
		const testState = {
			...startState,
		}

		const action = moveTodo({
			taskId: "2",
			destinationIndex: 1,
			destinationColumn: "Done",
		})

		const endState = todosReducer(testState, action)

		expect(endState.tasks[0].text).toEqual("Task 1")
		expect(endState.tasks[1].text).toEqual("Task 2")
		expect(endState.tasks[2].text).toEqual("Task 3")
		expect(endState.tasks[1].column).toEqual("Done")
		expect(endState.columnsOrder).toEqual(["TO-DO", "In progress", "Done"])
	})
})
