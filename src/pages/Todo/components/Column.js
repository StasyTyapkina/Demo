import React, {useState} from "react"
import {styled} from "@mui/material/styles"
import {Droppable} from "react-beautiful-dnd"
import {TextField, Typography, Box, IconButton} from "@mui/material"
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"
import {TodoCard} from "./TodoCard"

const ColumnContainer = styled(Box)({
	margin: "12px",
	padding: "12px",
	border: "1px solid #ddd",
	borderRadius: 10,
	flex: 1,
})

const TextFieldContainer = styled(Box)({
	margin: "15px 0",
	display: "flex",
	justifyContent: "space-between",
})

export const Column = ({column, tasks, onAddTodo}) => {
	const [newTodoText, setNewTodoText] = useState("")

	const handleAddTodo = () => {
		if (newTodoText.trim() !== "") {
			onAddTodo(newTodoText, column)
			setNewTodoText("")
		}
	}

	return (
		<ColumnContainer>
			<Typography variant="h2">{column}</Typography>
			<TextFieldContainer>
				<TextField
					type="text"
					value={newTodoText}
					onChange={(e) => setNewTodoText(e.target.value)}
					placeholder="New Todo"
					fullWidth
					variant="outlined"
					size="small"
				/>

				<IconButton variant="contained" color="primary" onClick={handleAddTodo} title="Add Todo">
					<AddCircleOutlineIcon />
				</IconButton>
			</TextFieldContainer>

			<Droppable droppableId={column} type="task">
				{(provided) => (
					<div {...provided.droppableProps} ref={provided.innerRef}>
						{tasks.map((task, index) => (
							<TodoCard task={task} key={index} index={index}></TodoCard>
						))}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</ColumnContainer>
	)
}
