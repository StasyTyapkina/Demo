import React from "react"
import {Typography, Button} from "@mui/material"
import {useSelector} from "react-redux"
import {StyledCard} from "../../../components/StyledCard"

export const InfoCard = () => {
	const randomActivity = useSelector((state) => state.main.randomActivity)

	return (
		<StyledCard>
			{Object.keys(randomActivity).length !== 0 ? (
				<>
					<Typography variant="h3" gutterBottom>
						{randomActivity.activity}
					</Typography>
					<Typography variant="h6" gutterBottom>
						Type: {randomActivity.type}
					</Typography>

					<Typography variant="h6" gutterBottom>
						Participants: {randomActivity.participants}
					</Typography>

					<Typography variant="h6" gutterBottom>
						Price: {randomActivity.price}
					</Typography>

					<Typography variant="h6" gutterBottom>
						Accessibility: {randomActivity.accessibility}
					</Typography>

					{randomActivity.link && (
						<Button variant="contained" href={randomActivity.link} target="_blank" sx={{maxWidth: "300px"}}>
							Learn More
						</Button>
					)}
				</>
			) : (
				<Typography variant="h6" gutterBottom>
					No data
				</Typography>
			)}
		</StyledCard>
	)
}
