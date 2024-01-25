import {useState} from "react"

export const useExportToExcel = (documentsMonthlyData) => {
	const [dataToExport, setDataToExport] = useState([])

	const prepareData = () => {
		let dataArray = []

		for (let i = 0; i < documentsMonthlyData.length; i++) {
			const month = documentsMonthlyData[i].month

			for (let j = 0; j < documentsMonthlyData[i].data.length; j++) {
				const sectionData = documentsMonthlyData[i].data[j]
				const sectionName = sectionData.sectionName

				for (let k = 0; k < sectionData.data.length; k++) {
					const item = sectionData.data[k]
					const createData = {
						month,
						sectionName,
						...item,
					}
					dataArray.push(createData)
				}
			}
		}

		setDataToExport(dataArray)
	}

	return {dataToExport, prepareData}
}
