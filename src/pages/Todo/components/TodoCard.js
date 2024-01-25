import React, {useCallback} from "react"
import PropTypes from "prop-types"
import {useDispatch} from "react-redux"
import {Card, CardHeader, IconButton} from "@mui/material"
import {Draggable} from "react-beautiful-dnd"
import DeleteIcon from "@mui/icons-material/Delete"
import {removeTodo} from "../../../store/todosSlice"

export const TodoCard = ({task, index}) => {
	const dispatch = useDispatch()

	//to avoid recreating the handleRemoveTodo function use useCallback
	const handleRemoveTodo = useCallback(() => {
		dispatch(removeTodo(task.id))
	}, [dispatch, task.id])

	return (
		<Draggable key={task.id} draggableId={task.id} index={index}>
			{(provided) => (
				<Card {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} sx={{mb: 1}}>
					<CardHeader
						action={
							<IconButton size="small" onClick={() => handleRemoveTodo(task.id)} title="Delete">
								<DeleteIcon />
							</IconButton>
						}
						title={task?.text}
					/>
				</Card>
			)}
		</Draggable>
	)
}

TodoCard.propTypes = {
	task: PropTypes.object,
	index: PropTypes.number,
}
