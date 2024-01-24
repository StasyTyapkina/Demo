/**обработка ячеект для выгрузки в эксель */
export const subHeaderFunc = (worksheet) => {
	worksheet.insertRow(1, [])
	worksheet.mergeCells("A1:A2")
	worksheet.mergeCells("B1:D1")
	worksheet.mergeCells("E1:I1")
	worksheet.mergeCells("J1:M1")
	worksheet.mergeCells("N1:Q1")
	worksheet.mergeCells("R1:U1")
	worksheet.getCell("A1").value = "Месяц"
	worksheet.getCell("B1").value = "Входящие документы"
	worksheet.getCell("E1").value = "Черновики"
	worksheet.getCell("J1").value = "Отклоненные"
	worksheet.getCell("N1").value = "На согласовании"
	worksheet.getCell("R1").value = "Ожидают подписи"
}
