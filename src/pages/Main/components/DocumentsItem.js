import React from "react"
import PropTypes from "prop-types"
import {Typography, Box} from "@mui/material"
import {styled} from "@mui/material/styles"

const DataItem = styled(Box)({
	display: "flex",
	flexDirection: "column",
	borderRight: "1px solid #CFCFCF",
	marginTop: "20px",
	paddingRight: "25px",
	paddingLeft: "10px",
	"&:last-child": {
		borderRight: "none",
	},
	"&:nth-of-type(1)": {
		paddingLeft: "0px",
	},
})

//компонент отображает данные по документам
export const DocumentsItem = ({item}) => {
	return (
		<Box
			sx={{
				display: "flex",
			}}>
			{item.length > 0 ? (
				item.map((a, i) => (
					<DataItem key={i}>
						<Typography
							variant="h2"
							gutterBottom
							sx={{
								color: "#004D98",
							}}>
							{a.docsNumber ? a.docsNumber : "0"}
						</Typography>
						<Typography variant="h6" gutterBottom>
							{a.title}
						</Typography>
					</DataItem>
				))
			) : (
				<DataItem>
					<Typography variant="h6" gutterBottom>
						Нет данных
					</Typography>
				</DataItem>
			)}
		</Box>
	)
}

DocumentsItem.propTypes = {
	item: PropTypes.array,
}
