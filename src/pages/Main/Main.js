import React, {useState, useEffect} from "react"
import {Grid, Box} from "@mui/material"
import {Header} from "../../components/Header/Header"
import {SelectComponent} from "../../components/Header/SelectComponent"
import data from "../../json/main.json"
import currentProjects from "./API/currentProjects.json"
import statistics from "./API/statistics.json"

import {CardItem} from "../../components/CardItem"
import {CardItemWithIcon} from "./components/CardItemWithIcon"
import {CurrentProjectItem} from "./components/CurrentProjectItem"
import {DocumentsItem} from "./components/DocumentsItem"
import {StatisticsItem} from "./components/StatisticsItem.js"
import {EmptyContainer} from "./components/EmptyContainer"
import {XLSExport} from "../../components/XLSExport"

import {headerForDocuments, headerForTasks, headerForProjects, headerForTeam} from "./utils/headers"
import {subHeaderFunc} from "./utils/subHeaderFunc"

import {documentsMonthlyData} from "./API/documents.js"

/**Main Page */
export const Main = () => {
	//вычисляем название текущего месяца
	const currentMonth = data.monthList[new Date().getMonth()]

	//значение селекта месяц
	const [month, setMonth] = useState(currentMonth)

	//отфильтрованые данные по статистике
	const [filteredStatistics, setFilteredStatistics] = useState({})

	//отфильтрованые данные по документам
	const [filteredDocuments, setFilteredDocuments] = useState([])

	//новые данные для выгрузки в эксель
	const [dataToExport, setDataToExport] = useState([])

	//смена месяца  в селекте
	const handleChangeValue = (e) => {
		setMonth(e.target.value)
	}

	//добавляем старый список Отчетов (не отфильтрованный) при первой отрисовке страницы
	useEffect(() => {
		const filteredStat = statistics.find((item) => item.month === month)?.data
		const filteredDoc = documentsMonthlyData.find((item) => item.month === month)?.data
		setFilteredStatistics(filteredStat ? filteredStat : {})
		setFilteredDocuments(filteredDoc ? filteredDoc : [])
	}, [month])

	useEffect(() => {
		//пересобираем данные для выгрузки в эксель
		const newArray = documentsMonthlyData.map((item) => {
			const objTemp = {}
			//из массива с объектами выбираем названия организация
			const sectionArray = item.data.map((month) => {
				const arr = month.data.map((section) => {
					return {
						name: `${month.sectionName}${section.titleEN}`,
						docsNumber: section.docsNumber,
					}
				})
				return arr.reduce((acc, n) => ((acc[n.name] = n.docsNumber), acc), {})
			})

			sectionArray.map((item) => Object.assign(objTemp, item))
			return {...objTemp, month: item.month}
		})
		const newArrayTwo = statistics.map((item) => {
			return {...item.data, month: item.month}
		})

		let developmentData = []

		const newArrayFour = developmentData.map((item) => ({
			developer: item.developer,
			position: item.position,
			workStartDate: item.workStartDate,
		}))

		setDataToExport([newArray, newArrayTwo, currentProjects, newArrayFour])
	}, [])

	return (
		<>
			<Header title={"Basic indicators"}>
				<SelectComponent valueList={data.monthList} chosenValue={month} handleChangeValue={handleChangeValue} />
				<XLSExport
					fileName="Basic indicators"
					workSheetName={["documents", "project statistics", "projects", "staff"]}
					dataToExport={dataToExport}
					header={[headerForDocuments, headerForTasks, headerForProjects, headerForTeam]}
					boldTotal={false}
					subheader={true}
					subheaderFunc={subHeaderFunc}
				/>
			</Header>

			<Grid container spacing={3}>
				{filteredDocuments.length > 0 ? (
					filteredDocuments.map((item, i) => (
						<CardItemWithIcon key={i} itemWidth={4} itemHeight={"180px"} title={item.sectionName} item={item.data}>
							<DocumentsItem item={item.data} />
						</CardItemWithIcon>
					))
				) : (
					<EmptyContainer />
				)}

				<CardItem itemWidth={4} title="Statistics">
					<Box
						sx={{
							display: "flex",
						}}>
						<StatisticsItem statistics={filteredStatistics} />
					</Box>
				</CardItem>
				<CardItem itemWidth={8} title="Current projects" raise={true}>
					{currentProjects && currentProjects.map((item, i) => <CurrentProjectItem item={item} index={i} key={i} />)}
				</CardItem>
			</Grid>
		</>
	)
}
