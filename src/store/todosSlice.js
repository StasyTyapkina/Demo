import {createSlice} from "@reduxjs/toolkit"

const initialTasks = [
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
]

const initialState = {
	tasks: initialTasks,
	columnsOrder: ["TO-DO", "In progress", "Done"],
}

const todosSlice = createSlice({
	name: "todos",
	initialState,
	reducers: {
		addTodo: (state, action) => {
			state.tasks.push(action.payload)
		},
		removeTodo: (state, action) => {
			state.tasks = state.tasks.filter((task) => task.id !== action.payload)
		},
		moveTodo: (state, action) => {
			const {taskId, destinationIndex, destinationColumn} = action.payload
			const movedTask = state.tasks.find((task) => task.id === taskId)
			state.tasks = state.tasks.filter((task) => task.id !== taskId)
			state.tasks.splice(destinationIndex, 0, {...movedTask, column: destinationColumn})
		},
	},
})

export const {addTodo, removeTodo, moveTodo} = todosSlice.actions
export const todosReducer = todosSlice.reducer
