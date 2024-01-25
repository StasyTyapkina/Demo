import React, {useState} from "react"
import PropTypes from "prop-types"
import {Grid, Typography, IconButton, Box, Dialog, DialogTitle, DialogContent} from "@mui/material"
import {styled} from "@mui/material/styles"
import DataSaverOffIcon from "@mui/icons-material/DataSaverOff"
import {PieChart, Pie, Cell, Legend, Tooltip} from "recharts"
import {StyledCard} from "../../../components/StyledCard"

const CIconButton = styled(IconButton)({
	marginRight: "12px",
	"&:hover": {
		background: "rgba(0, 75, 135, 0.1);",
	},
})

const Title = styled(DialogTitle)({
	fontWeight: "600",
	fontSize: "20px",
	lineHeight: "32px",
	color: "#1F1F1F",
	letterSpacing: "0.15px",
	padding: "29px 16px 16px 38px",
})

//create a card to display information on the main page
export const CardItemWithIcon = ({title, children, item}) => {
	const [open, setOpen] = useState(false)

	return (
		<Grid item xs={12} sm={12} md={6} lg={4}>
			<StyledCard>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}>
					<Typography variant="h3" gutterBottom>
						{title}
					</Typography>

					<CIconButton onClick={() => setOpen(true)}>
						<DataSaverOffIcon />
					</CIconButton>

					<CPieChart item={item} title={title} setOpen={setOpen} open={open} />
				</Box>

				{children}
			</StyledCard>
		</Grid>
	)
}

//graph for data display
export const CPieChart = ({title, setOpen, open, item}) => {
	const filteredData = item.filter((item) => item.title !== "Summary")

	const generateRandomColor = () => {
		// generate random color in HEX format
		return "#" + Math.floor(Math.random() * 16777215).toString(16)
	}

	return (
		<Dialog
			onClose={() => setOpen(false)}
			open={open}
			fullWidth
			maxWidth={"sm"}
			PaperProps={{
				style: {borderRadius: 16},
			}}>
			<Title>{title}</Title>
			<DialogContent>
				<Box sx={{display: "flex", justifyContent: "center"}}>
					<PieChart width={400} height={400}>
						<Pie data={filteredData} dataKey="docsNumber" nameKey="title" cx="50%" cy="50%" outerRadius={80} label>
							{filteredData.map((entry, index) => (
								<Cell key={`cell-${index}`} fill={generateRandomColor()} />
							))}
						</Pie>
						<Tooltip formatter={(value, name) => [`${name} - ${value}`]} />
						<Legend />
					</PieChart>
				</Box>
			</DialogContent>
		</Dialog>
	)
}

CPieChart.propTypes = {
	title: PropTypes.string,
	setOpen: PropTypes.func,
	open: PropTypes.bool,
	item: PropTypes.array,
}

CardItemWithIcon.propTypes = {
	title: PropTypes.string,
	children: PropTypes.node,
}
