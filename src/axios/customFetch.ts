import axios from "axios"

// const ozonAPIURL = "https://ozon-server.onrender.com/api/v1"
// const ozonAPIURL = "http://localhost:3000/api/v1"
// const ozonAPIURL = "https://busy-red-zebra-robe.cyclic.app/api/v1"

// export const serverURL = "https://ozon-server.onrender.com"
export const serverURL = "http://localhost:3000"
// export const serverURL = "https://busy-red-zebra-robe.cyclic.app"

const ozonAPIURL = serverURL + "/api/v1"
export const ozonAPI = axios.create({
	baseURL: ozonAPIURL,
	withCredentials: true,
})
