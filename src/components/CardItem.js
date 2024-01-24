import React from "react"
import PropTypes from "prop-types"
import {Grid, Paper, Typography, IconButton, Box} from "@mui/material"
import {styled} from "@mui/material/styles"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import DataSaverOffIcon from "@mui/icons-material/DataSaverOff"

const CIconButton = styled(IconButton)({
	marginLeft: "2px",
	"&:hover": {
		background: "rgba(0, 75, 135, 0.1);",
	},
})

//создание карточки для отображения информации на основной странице
export const CardItem = ({itemWidth, itemHeight, title, children, important, raise, isIcon}) => {
	return (
		<Grid item xs={itemWidth} id={"pdf-content"}>
			<Paper
				sx={{
					mt: raise ? "-190px" : null,
					height: itemHeight ? itemHeight : "inherit",
					p: "24px 0 34px 18px",
					display: "flex",
					flexDirection: "column",
					boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.12), 0px 0px 0px 1px rgba(0, 0, 0, 0.05)",
					borderRadius: "16px",
				}}>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}>
					<Typography variant="h3" gutterBottom sx={{color: important ? "#CF1322" : "#1F1F1F"}}>
						{title}
					</Typography>
					{isIcon ? (
						<CIconButton>
							<DataSaverOffIcon />
						</CIconButton>
					) : null}
				</Box>

				{children}
			</Paper>
		</Grid>
	)
}

CardItem.propTypes = {
	itemWidth: PropTypes.number,
	title: PropTypes.string,
	children: PropTypes.node,
	important: PropTypes.bool,
	raise: PropTypes.bool,
}
