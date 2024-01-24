import React, {useEffect, useState} from "react"
import * as Excel from "exceljs"
import {saveAs} from "file-saver"
import PropTypes from "prop-types"
import FileDownloadIcon from "@mui/icons-material/FileDownload"
import {Button, Grid} from "@mui/material"

/**
 * dataToExport - данные для выгрузки
 * fileName - название выгружаемого файла
 * header - массив с заголовками таблицы
 */

/**компонент для выгрузки в эксель(кнопка+логика) */
export const XLSExport = ({subheaderFunc, workSheetName, dataToExport, fileName, header, hideBttn, boldTotal, subheader = false}) => {
	//название листа
	// const workSheetName = "Таблица"
	//название файла
	const workBookName = fileName || "Таблица"
	//данные для экспорта таблицы
	const [data, setData] = useState([])

	/**подготовка данных для выгрузки */
	useEffect(() => {
		//промежуточный массив данных
		let dataArray = []

		for (let i = 0; i < dataToExport.length; i++) {
			//массив с ключами от хедэров
			let keys_to_keep = []

			//создаем массив с ключами, по которым будет формироваться таблица
			for (let j = 0; j < header[i].length; j++) {
				keys_to_keep.push(header[i][j].key)
			}

			/**фильтруем данные по ключам*/
			const createData = (array) =>
				array.map((o) =>
					keys_to_keep.reduce((acc, curr) => {
						acc[curr] = o[curr]
						return acc
					}, {})
				)
			dataArray.push(createData(dataToExport[i]))
			// dataArray = createData(dataToExport[i])
		}

		setData(dataArray)
	}, [dataToExport, header])

	//создание воркбука(файла)
	const workbook = new Excel.Workbook()

	/**выгрузка данных в эксель */
	const saveExcel = async () => {
		try {
			const fileName = workBookName

			// создаем новую таблицу
			for (let i = 0; i < dataToExport.length; i++) {
				const worksheet = workbook.addWorksheet(workSheetName[i])

				// добавляем столбцы
				// каждый столбец содержит заголовок и его ключ
				worksheet.columns = header[i]

				if (subheader && i === 0) {
					subheaderFunc(worksheet)
				}

				// для всех колонок делаем выравнивание по ширине и по середине
				worksheet.columns.forEach((column) => {
					column.alignment = {vertical: "middle", horizontal: "center", wrapText: true}
				})

				// добавление данных на лист
				data[i].forEach((singleData) => {
					worksheet.addRow(singleData)
				})

				// меняем шрифт первой строки
				worksheet.getRow(1).font = {bold: true, size: 12}

				//let columnCount = worksheet.columnCount количество столбцов

				if (boldTotal) {
					//считаем количество строк
					let rowCount = worksheet.rowCount
					worksheet.getRow(rowCount).font = {bold: true, size: 14}
					worksheet.getRow(rowCount - 1).font = {bold: true, size: 14}
				}
				// добавляем границы таблицы и ячеек.
				worksheet.eachRow({includeEmpty: false}, (row) => {
					// сохраняем каждую ячейку в currentCell
					const currentCell = row._cells

					// применяем границу только для непустой ячейки
					currentCell.forEach((singleCell) => {
						// сохраняем адрес ячейки (A1, A2, A3, B1, B2, B3, ...)
						const cellAddress = singleCell._address

						// добавляем границы
						worksheet.getCell(cellAddress).border = {
							top: {style: "thin"},
							left: {style: "thin"},
							bottom: {style: "thin"},
							right: {style: "thin"},
						}
					})
				})
			}

			// сохраняем контент с помощью writeBuffer
			const buf = await workbook.xlsx.writeBuffer()

			// скачиваем обработанный файл
			saveAs(new Blob([buf]), `${fileName}.xlsx`)
		} catch (error) {
			console.error("Something Went Wrong", error.message)
		} finally {
			// удаление экземпляра рабочего листа для создания нового
			workbook.removeWorksheet(workSheetName)
		}
	}

	return (
		<>
			{!hideBttn ? (
				<Grid item>
					<Button sx={{borderRadius: 64, height: 36}} variant="contained" onClick={saveExcel} endIcon={<FileDownloadIcon />}>
						Экспортировать
					</Button>
				</Grid>
			) : null}
		</>
	)
}

XLSExport.propTypes = {
	dataToExport: PropTypes.array,
	fileName: PropTypes.string,
	header: PropTypes.array,
	hideBttn: PropTypes.bool,
	boldTotal: PropTypes.bool,
	subheaderFunc: PropTypes.func,
}
