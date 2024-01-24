import React from "react"
import PropTypes from "prop-types"
import {Button, Grid} from "@mui/material"
import {saveAs} from "file-saver"
import {AlignmentType, Document, HeadingLevel, Packer, Paragraph, TextRun} from "docx"
import FileDownloadIcon from "@mui/icons-material/FileDownload"

export const ExportToDocButton = ({data, month}) => {
	const generateDocx = (data) => {
		const docExp = new Document({
			sections: [
				{
					properties: {
						page: {
							margin: {
								top: 1000,
								right: 1000,
								bottom: 1000,
								left: 1000,
							},
						},
					},

					children: [
						new Paragraph({
							text: `Отчет за ${month}`,
							heading: HeadingLevel.HEADING_1,
							alignment: AlignmentType.CENTER,
							spacing: {
								after: 200,
							},
						}),

						...paragraphCreate(data),
					],
				},
			],
		})

		Packer.toBlob(docExp).then((blob) => {
			saveAs(blob, `Отчёты.docx`)
		})
	}

	const paragraphCreate = (data) => {
		return data.map(
			(item) =>
				new Paragraph({
					spacing: {
						before: 200,
					},
					children: [
						new TextRun({
							text: `Отчёт №${item.reportNumber}`,
							bold: true,
						}),
						new TextRun({
							text: item.reasonRus,
							bold: true,
							break: 1,
						}),
						new TextRun({
							text: item.description,
							break: 1,
						}),
					],
				})
		)
	}

	return (
		<Grid item>
			<Button sx={{borderRadius: 64, height: 36}} variant="contained" onClick={() => generateDocx(data)} endIcon={<FileDownloadIcon />}>
				Выгрузить в .docx
			</Button>
		</Grid>
	)
}

ExportToDocButton.propTypes = {
	data: PropTypes.array,
}
