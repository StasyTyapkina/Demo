import React, {useState, useEffect} from "react"
import {useDispatch} from "react-redux"
import {Grid} from "@mui/material"
import {Header} from "../../components/Header/Header"
import {SelectComponent} from "../../components/Header/SelectComponent"
import {getRandomActivity} from "../../store/mainSlice.js"
import {CardItemWithIcon} from "./components/CardItemWithIcon"
import {DocumentsItem} from "./components/DocumentsItem"
import {InfoCard} from "./components/InfoCard.js"
import {XLSExport} from "../../components/XLSExport"
import {months, documentsMonthlyData, headersForExcel} from "./API/documents.js"
import {useExportToExcel} from "./utils/useExportToExcel.js"

export const Main = () => {
	const dispatch = useDispatch()

	const {dataToExport, prepareData} = useExportToExcel(documentsMonthlyData)

	const currentMonth = months[new Date().getMonth()]

	const [month, setMonth] = useState(currentMonth)

	const [filteredDocuments, setFilteredDocuments] = useState([])

	const handleChangeValue = (e) => {
		setMonth(e.target.value)
	}

	useEffect(() => {
		dispatch(getRandomActivity())
	}, [])

	useEffect(() => {
		const filteredDoc = documentsMonthlyData.find((item) => item.month === month)?.data
		setFilteredDocuments(filteredDoc ? filteredDoc : [])
	}, [month])

	useEffect(() => {
		//preparing data for uploading to excel
		prepareData()
	}, [])

	return (
		<>
			<Header title={"Info"}>
				<SelectComponent valueList={months} chosenValue={month} handleChangeValue={handleChangeValue} />
				<XLSExport dataToExport={dataToExport} tableHeader={headersForExcel} fileName={"Documents"} />
			</Header>

			<Grid container spacing={3}>
				{filteredDocuments &&
					filteredDocuments.map((item, i) => (
						<CardItemWithIcon key={i} title={item.sectionName} item={item.data}>
							<DocumentsItem item={item.data} />
						</CardItemWithIcon>
					))}

				<Grid item xs={8}>
					<InfoCard />
				</Grid>
			</Grid>
		</>
	)
}
