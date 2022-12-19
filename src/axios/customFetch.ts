import axios from "axios"

// const ozonAPIURL = "https://ozon-server.onrender.com/api/v1"
const ozonAPIURL = "http://localhost:3000/api/v1"
console.log(ozonAPIURL)

export const ozonAPI = axios.create({
	baseURL: ozonAPIURL,
	withCredentials: true,
})
