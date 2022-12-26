import { createAsyncThunk } from "@reduxjs/toolkit"
import { ozonAPI } from "../../../axios/customFetch"
import { FilterType } from "../filter/filterSlice"
import { RootState } from "../../store"

export const createProduct = createAsyncThunk(
	"product/create",
	async (formData: any, thunkAPI) => {
		try {
			const resp = await ozonAPI("/products", {
				data: formData,
				method: "post",
				headers: { "content-type": "multipart/form-data" },
			})
			console.log("RESP = ", resp)
			return resp
		} catch (error: any) {
			console.log("error caight = ", error)
			return thunkAPI.rejectWithValue(error.response.data.msg)
		}
	}
)
export const uploadImages = createAsyncThunk(
	"product/uploadImages",
	async (formData: any, thunkAPI) => {
		try {
			const resp = await ozonAPI.post("/products/uploadImage", formData, {
				headers: { "content-type": "multipart/form-data" },
			})
			console.log("RESP = ", resp)
			return resp.data
		} catch (error: any) {
			console.log("error caight = ", error)
			return thunkAPI.rejectWithValue(error.response.data.msg)
		}
	}
)

export const getAllProducts = createAsyncThunk(
	"product/getAllProducts",
	async (_, thunkAPI) => {
		try {
			const { filter } = thunkAPI.getState() as RootState

			const queryParams = createQueryParams(filter)
			// console.log({ queryParams })

			const { data } = await ozonAPI(`/products${queryParams}`)
			return data
		} catch (error: any) {
			console.log("error caight = ", error)
			return thunkAPI.rejectWithValue(error.response.data.msg)
		}
	}
)
export const getSingleProduct = createAsyncThunk(
	"product/getSingleProduct",
	async (id: string, thunkAPI) => {
		try {
			const { data } = await ozonAPI(`/products/${id}`)
			return data
		} catch (error: any) {
			console.log("error caight = ", error)
			return thunkAPI.rejectWithValue(error.response.data.msg)
		}
	}
)

const createQueryParams = (params: FilterType) => {
	const {
		title,
		imagesAmount,
		minPrice,
		maxPrice,
		minAverageRating,
		maxAverageRating,
		limit,
		page,
		sort,
		numOfReviews,
		companies,
		categories,
		tags,
	} = params
	let query = "?"

	if (title) query += `&title=${title}`
	if (imagesAmount) query += `&imagesAmount=${imagesAmount}`
	if (limit) query += `&limit=${limit}`
	if (page) query += `&page=${page}`
	if (sort) query += `&sort=${sort}`
	let numericFilters = "&numericFilters="
	if (minPrice) numericFilters += `price>=${minPrice},`
	if (maxPrice) numericFilters += `price<=${maxPrice},`
	if (minAverageRating)
		numericFilters += `averageRating>=${minAverageRating},`
	if (maxAverageRating)
		numericFilters += `averageRating<=${maxAverageRating},`
	if (numOfReviews) numericFilters += `numOfReviews<=${numOfReviews},`
	if (numericFilters !== "&numericFilters=") {
		query += numericFilters
	}
	if (companies.length > 0) {
		query += `&companies=${companies.join(",")}`
	}
	if (tags.length > 0) {
		query += `&tags=${tags.join(",")}`
	}
	if (categories.length > 0) {
		query += `&categories=${categories.join(",")}`
	}

	query = query.replace("?&", "?")
	return query
}
