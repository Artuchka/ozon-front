import axios from "axios"

const ozonAPIURL = "https://ozon-server.onrender.com/api/v1"
console.log(ozonAPIURL)

export const ozonAPI = axios.create({
	baseURL: ozonAPIURL,
})
