const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

const generateRandomDocsNumber = () => Math.floor(Math.random() * 101) // Generate numbers from 0 to 100

const generateData = () => {
	const data = [
		{
			title: "Team 1",
			docsNumber: generateRandomDocsNumber(),
		},
		{
			title: "Team 2",
			docsNumber: generateRandomDocsNumber(),
		},
		{
			title: "Team 3",
			docsNumber: generateRandomDocsNumber(),
		},
	]

	//Add  as the sum of the other values
	const summaryDocsNumber = data.reduce((sum, item) => sum + item.docsNumber, 0)
	data.unshift({
		title: "Summary",
		docsNumber: summaryDocsNumber,
	})

	return data
}

const generateMonthlyData = () => {
	return months.map((month) => ({
		month: month,
		data: [
			{
				sectionName: "Inbox Documents",
				data: generateData(),
			},
			{
				sectionName: "Drafts Documents",
				data: generateData(),
			},
			{
				sectionName: "Rejected Documents",
				data: generateData(),
			},

			{
				sectionName: "Pending Approval",
				data: generateData(),
			},
			{
				sectionName: "Pending for Signature",
				data: generateData(),
			},
		],
	}))
}

export const documentsMonthlyData = generateMonthlyData()
