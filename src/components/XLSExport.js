import React, {useEffect, useState} from "react"
import * as Excel from "exceljs"
import {saveAs} from "file-saver"
import PropTypes from "prop-types"
import FileDownloadIcon from "@mui/icons-material/FileDownload"
import {Button, Grid} from "@mui/material"

export const XLSExport = ({dataToExport, tableHeader, fileName}) => {
	const workSheetName = "Table"

	const workBookName = fileName || "Table"

	const [data, setData] = useState([])

	useEffect(() => {
		let dataArray = []
		//array with keys from headers
		let keys_to_keep = []

		//create an array with the keys by which the table will be formed
		for (let i = 0; i < tableHeader.length; i++) {
			keys_to_keep.push(tableHeader[i].key)
		}

		const createData = (array) =>
			array.map((o) =>
				keys_to_keep.reduce((acc, curr) => {
					acc[curr] = o[curr]
					return acc
				}, {})
			)
		dataArray = createData(dataToExport)

		setData(dataArray)
	}, [dataToExport, tableHeader])

	const workbook = new Excel.Workbook()

	const saveExcel = async () => {
		try {
			const fileName = workBookName

			const worksheet = workbook.addWorksheet(workSheetName)

			worksheet.columns = tableHeader

			worksheet.columns.forEach((column) => {
				column.alignment = {vertical: "middle", horizontal: "center", wrapText: true}
			})

			data.forEach((singleData) => {
				worksheet.addRow(singleData)
			})

			worksheet.getRow(1).font = {bold: true, size: 12}

			// add cell borders
			worksheet.eachRow({includeEmpty: false}, (row) => {
				const currentCell = row._cells

				// apply the border only to a non-empty cell
				currentCell.forEach((singleCell) => {
					// store cell address (A1, A2, A3, B1, B2, B3, ...)
					const cellAddress = singleCell._address

					worksheet.getCell(cellAddress).border = {
						top: {style: "thin"},
						left: {style: "thin"},
						bottom: {style: "thin"},
						right: {style: "thin"},
					}
				})
			})

			const buf = await workbook.xlsx.writeBuffer()

			// download the processed file
			saveAs(new Blob([buf]), `${fileName}.xlsx`)
		} catch (error) {
			console.error("Something Went Wrong", error.message)
		} finally {
			//deleting a worksheet instance to create a new one
			workbook.removeWorksheet(workSheetName)
		}
	}

	return (
		<Grid item>
			<Button sx={{borderRadius: 64, height: 36}} variant="contained" onClick={saveExcel} endIcon={<FileDownloadIcon />}>
				Export
			</Button>
		</Grid>
	)
}

XLSExport.propTypes = {
	dataToExport: PropTypes.array,
	fileName: PropTypes.string,
	header: PropTypes.array,
}
