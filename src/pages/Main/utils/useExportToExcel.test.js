import {renderHook, act} from "@testing-library/react-hooks"
import {useExportToExcel} from "./useExportToExcel"

describe("useExportToExcel Hook testing", () => {
	it("should prepare data for export", () => {
		let documentsMonthlyData = [
			{
				month: "January",
				data: [
					{
						sectionName: "Inbox Documents",
						data: [
							{
								title: "Summary",
								docsNumber: 8,
							},
							{
								title: "Team 1",
								docsNumber: 5,
							},
							{
								title: "Team 2",
								docsNumber: 3,
							},
						],
					},
					{
						sectionName: "Drafts Documents",
						data: [
							{
								title: "Summary",
								docsNumber: 5,
							},
							{
								title: "Team 1",
								docsNumber: 2,
							},
							{
								title: "Team 2",
								docsNumber: 3,
							},
						],
					},
				],
			},
			{
				month: "February",
				data: [
					{
						sectionName: "Inbox Documents",
						data: [
							{
								title: "Summary",
								docsNumber: 3,
							},
							{
								title: "Team 1",
								docsNumber: 1,
							},
							{
								title: "Team 2",
								docsNumber: 2,
							},
						],
					},
					{
						sectionName: "Drafts Documents",
						data: [
							{
								title: "Summary",
								docsNumber: 46,
							},
							{
								title: "Team 1",
								docsNumber: 46,
							},
						],
					},
				],
			},
		]

		const {result} = renderHook(() => useExportToExcel(documentsMonthlyData))

		act(() => {
			result.current.prepareData()
		})

		const {dataToExport} = result.current

		expect(dataToExport).toHaveLength(11)
		expect(dataToExport[0]).toEqual({
			month: "January",
			sectionName: "Inbox Documents",
			title: "Summary",
			docsNumber: 8,
		})
		expect(dataToExport[1]).toEqual({
			month: "January",
			sectionName: "Inbox Documents",
			title: "Team 1",
			docsNumber: 5,
		})
	})
})
