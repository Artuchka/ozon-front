export const getIntlDate = (date: any) => {
	return Intl.DateTimeFormat("ru-RU", {
		year: "numeric",
		month: "long",
		day: "numeric",
	}).format(new Date(date))
}