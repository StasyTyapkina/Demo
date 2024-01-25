import React from "react"
import {useDispatch, useSelector} from "react-redux"
import {Alert, Snackbar} from "@mui/material"
import {styled} from "@mui/system"
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline"
import {clearSnackbarNotification} from "../store/snackbarSlice"

const AlertMod = styled(Alert)({
	minWidth: 380,
	borderRadius: "4px",
})

export const SimpleSnackbar = () => {
	const dispatch = useDispatch()
	let notificationMessage = useSelector((state) => state.snackbar.notificationMessage)
	let notificationType = useSelector((state) => state.snackbar.notificationType)
	let isVisible = useSelector((state) => state.snackbar.isVisible)

	console.log(notificationMessage)
	const handleClose = () => {
		dispatch(clearSnackbarNotification())
	}

	const returnAlertColor = (type) => {
		switch (type) {
			case "error":
				return "#CE0725"
			case "success":
				return "#89CE07"
			case "warning":
				return "#F2CF08"
			case "info":
				return "#0757CE"
			default:
				return "#89CE07"
		}
	}

	return (
		<>
			{isVisible ? (
				<Snackbar
					open={isVisible}
					autoHideDuration={10000}
					onClose={handleClose}
					anchorOrigin={{
						vertical: "bottom",
						horizontal: "right",
					}}>
					<AlertMod
						variant="filled"
						iconMapping={{
							success: <CheckCircleOutlineIcon fontSize="inherit" />,
						}}
						severity={notificationType}
						sx={{backgroundColor: `${returnAlertColor(notificationType)}`, color: "#fff"}}
						onClose={handleClose}>
						{notificationMessage}
					</AlertMod>
				</Snackbar>
			) : null}
		</>
	)
}
