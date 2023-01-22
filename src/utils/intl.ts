export const getIntlDate = (date: any) => {
	return Intl.DateTimeFormat("ru-RU", {
		year: "numeric",
		month: "long",
		day: "numeric",
	}).format(new Date(date))
}

export const formatPrice = (price: number) => {
	return (
		price?.toLocaleString("ru-RU", {
			maximumFractionDigits: 2,
		}) || 0
	)
}
export const formatPhone = (phoneNumberString: string) => {
	const cleaned = ("" + phoneNumberString).replace(/\D/g, "")
	const match = cleaned.match(/^(7|8|\+7)?(\d{3})(\d{3})(\d{2})(\d{2})$/)
	console.log(match)

	if (match) {
		const intlCode = match[1] ? match[1] : ""
		return `${intlCode} (${match[2]}) ${match[3]}-${match[4]}-${match[5]}`
	}
	return null
}
