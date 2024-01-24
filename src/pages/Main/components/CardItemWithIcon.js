import React, {useState} from "react"
import PropTypes from "prop-types"
import {Grid, Paper, Typography, IconButton, Box, Dialog, DialogTitle, DialogContent} from "@mui/material"
import {styled} from "@mui/material/styles"
import DataSaverOffIcon from "@mui/icons-material/DataSaverOff"
import {PieChart, Pie} from "recharts"

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

//создание карточки для отображения информации на основной странице
export const CardItemWithIcon = ({itemWidth, itemHeight, title, children, important, item}) => {
	//состояние модального окна (октрыто/закрыто) для отображения графиков
	const [open, setOpen] = useState(false)

	return (
		<Grid item xs={itemWidth}>
			<Paper
				sx={{
					height: itemHeight ? itemHeight : "inherit",
					p: "16px 0 34px 18px",
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

					<CIconButton onClick={() => setOpen(true)}>
						<DataSaverOffIcon />
					</CIconButton>

					<CPieChart item={item} title={title} setOpen={setOpen} open={open} />
				</Box>

				{children}
			</Paper>
		</Grid>
	)
}

//графика для отображения данных
export const CPieChart = ({title, setOpen, open, item}) => {
	//всего документов
	const totalDoc = item ? item[0].docsNumber : "Нет данных"

	//данные для внешного круга
	const dataOuterCircle = item ? item.slice(1, 3) : []
	//данные для внутреннего круга
	const dataInnerCircle = item ? item.slice(3, 5) : []

	const RADIAN = Math.PI / 180
	//рендер контента внутреннего круга
	const renderCustomizedLabelInnerCircle = ({cx, cy, midAngle, innerRadius, outerRadius, value, index}) => {
		const radius = innerRadius + (outerRadius - innerRadius) * 0.25
		const x = cx + radius * Math.cos(-midAngle * RADIAN)
		const y = cy + radius * Math.sin(-midAngle * RADIAN)

		return (
			<text x={x} y={y} fill="white" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central">
				{dataInnerCircle[index].title} ({value})
			</text>
		)
	}
	//рендер контента внешного круга
	const renderCustomizedLabelOuterCircle = ({cx, cy, midAngle, innerRadius, outerRadius, value, index}) => {
		const radius = 25 + innerRadius + (outerRadius - innerRadius)
		const x = cx + radius * Math.cos(-midAngle * RADIAN)
		const y = cy + radius * Math.sin(-midAngle * RADIAN)

		return (
			<text x={x} y={y} fill="#004D98" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central" position="insideStart">
				{dataOuterCircle[index].title} ({value})
			</text>
		)
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
				<Box sx={{ml: "15px"}}>Всего документов : {totalDoc}</Box>
				<Box sx={{display: "flex", justifyContent: "center"}}>
					<PieChart width={500} height={500}>
						<Pie
							data={dataInnerCircle}
							dataKey="docsNumber"
							cx="50%"
							cy="50%"
							outerRadius={128}
							fill="#004D98"
							labelLine={false}
							label={renderCustomizedLabelInnerCircle}
						/>

						<Pie
							data={dataOuterCircle}
							dataKey="docsNumber"
							cx="50%"
							cy="50%"
							innerRadius={128}
							outerRadius={160}
							fill="#5B8C00"
							label={renderCustomizedLabelOuterCircle}
						/>
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
	itemWidth: PropTypes.number,
	itemHeight: PropTypes.string,
	title: PropTypes.string,
	children: PropTypes.node,
	important: PropTypes.bool,
}
