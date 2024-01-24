import React from "react"
import {useDispatch, useSelector} from "react-redux"
import {addTodo, moveTodo} from "../../store/todosSlice"
import {DragDropContext, Droppable} from "react-beautiful-dnd"
import {Column} from "./components/Column"
import {Header} from "../../components/Header/Header"

export const TodoList = () => {
	const dispatch = useDispatch()
	const tasks = useSelector((state) => state.todos.tasks)
	const columnsOrder = useSelector((state) => state.todos.columnsOrder)

	const handleDragEnd = (result) => {
		const {destination, draggableId} = result

		dispatch(
			moveTodo({
				taskId: draggableId,
				destinationIndex: destination.index,
				destinationColumn: destination.droppableId,
			})
		)
	}

	const handleAddTodo = (text, column) => {
		const newTodo = {
			id: new Date().getTime().toString(),
			text,
			column: columnsOrder.find((i) => i === column),
		}
		dispatch(addTodo(newTodo))
	}

	return (
		<div>
			<Header title={"Todo List"} />

			<DragDropContext onDragEnd={handleDragEnd}>
				<Droppable droppableId="columns" direction="horizontal" type="column">
					{(provided) => (
						<div {...provided.droppableProps} ref={provided.innerRef} style={{display: "flex"}}>
							{columnsOrder.map((column, index) => (
								<Column key={index} column={column} tasks={tasks.filter((task) => task.column === column)} onAddTodo={handleAddTodo} />
							))}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</DragDropContext>
		</div>
	)
}
