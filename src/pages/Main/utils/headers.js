//создаем заголовки таблицы
export const headerForDocuments = [
	{header: "Месяц", key: "month", width: 25},
	{header: "Всего", key: "incomingDocumentsSummary", width: 25},
	{header: "Волтов", key: "incomingDocumentsVoltov", width: 25},
	{header: "Иванов", key: "incomingDocumentsIvanov", width: 25},
	{header: "Всего", key: "draftDocumentsSummary", width: 25},
	{header: "Волтов", key: "draftDocumentsVoltov", width: 25},
	{header: "Иванов", key: "draftDocumentsIvanov", width: 25},
	{header: "Новые", key: "draftDocumentsNew", width: 25},
	{header: "В работе", key: "draftDocumentsInProccess", width: 25},
	{header: "Всего", key: "rejectedDocumentsSummary", width: 25},
	{header: "Волтов", key: "rejectedDocumentsVoltov", width: 25},
	{header: "Иванов", key: "rejectedDocumentsIvanov", width: 25},
	{header: "Новые", key: "rejectedDocumentsNew", width: 25},
	{header: "Всего", key: "forApprovalDocumentsSummary", width: 25},
	{header: "Волтов", key: "forApprovalDocumentsVoltov", width: 25},
	{header: "Иванов", key: "forApprovalDocumentsIvanov", width: 25},
	{header: "В работе", key: "forApprovalDocumentsInProccess", width: 25},
	{header: "Всего", key: "awaitingSignatureSummary", width: 25},
	{header: "Волтов", key: "awaitingSignatureVoltov", width: 25},
	{header: "Иванов", key: "awaitingSignatureIvanov", width: 25},
	{header: "В работе", key: "awaitingSignatureInProccess", width: 25},
]

export const headerForTasks = [
	{header: "Месяц", key: "month", width: 25},
	{header: "Созданные задачи", key: "createdTasks", width: 25},
	{header: "Выполненые задачи", key: "completedTasks", width: 25},
	{header: "Открытые pull requests", key: "pullRequests", width: 25},
	{header: "Commits", key: "commits", width: 25},
]

export const headerForProjects = [
	{header: "Имя проекта", key: "projectName", width: 25},
	{header: "Аббревиатура", key: "abbreviation", width: 25},
	{header: "Описание проекта", key: "description", width: 25},
]

export const headerForTeam = [
	{header: "Разработчик", key: "developer", width: 100},
	{header: "Направление", key: "position", width: 100},
	{header: "Работает в команде с", key: "workStartDate", width: 100},
]
