import {generateRandomDocsNumber, generateData, generateMonthlyData, months} from "./documents"

describe("Data Generator Functions", () => {
	it("generateRandomDocsNumber should generate a number between 0 and 100", () => {
		const randomDocsNumber = generateRandomDocsNumber()
		expect(randomDocsNumber).toBeGreaterThanOrEqual(0)
		expect(randomDocsNumber).toBeLessThanOrEqual(100)
	})

	it("generateData should generate an array with summary and team data", () => {
		const data = generateData()
		expect(data).toHaveLength(4)

		const summary = data[0]
		expect(summary.title).toEqual("Summary")

		let teamDocsNumbersSum = 0
		for (let i = 1; i < data.length; i++) {
			teamDocsNumbersSum += data[i].docsNumber
		}
		expect(summary.docsNumber).toEqual(teamDocsNumbersSum)
	})

	it("generateMonthlyData should generate data for each month and section", () => {
		const monthlyData = generateMonthlyData()
		expect(monthlyData).toHaveLength(months.length)

		monthlyData.forEach((monthData) => {
			expect(monthData.data).toHaveLength(6)

			monthData.data.forEach((sectionData) => {
				expect(sectionData.data).toHaveLength(4)
			})
		})
	})
})
