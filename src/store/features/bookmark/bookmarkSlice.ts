import { createSlice } from "@reduxjs/toolkit"
import { addBookmark, deleteBookmark, getAllBookmarks } from "./thunks"
import { toast } from "react-toastify"
import { ProductItemType } from "../../../components/ProductItem"

type bookmarkType = {
	product: ProductItemType
	user: string
	_id: string
}

type initType = {
	bookmarks: bookmarkType[]
	isLoading: boolean
}

const initialState = {
	bookmarks: [],
	isLoading: false,
} as initType

const BookmarkSlice = createSlice({
	name: "bookamark",
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder.addCase(getAllBookmarks.pending, (state) => {
			state.isLoading = true
		})
		builder.addCase(getAllBookmarks.fulfilled, (state, { payload }) => {
			const { msg, bookmarks } = payload
			state.isLoading = false
			state.bookmarks = bookmarks
		})
		builder.addCase(getAllBookmarks.rejected, (state, { payload }) => {
			state.isLoading = false
			toast.error(payload as string)
		})

		builder.addCase(deleteBookmark.pending, (state) => {
			state.isLoading = true
		})
		builder.addCase(deleteBookmark.fulfilled, (state, { payload }) => {
			const { msg } = payload
			state.isLoading = false
			toast.success(msg)
		})
		builder.addCase(deleteBookmark.rejected, (state, { payload }) => {
			state.isLoading = false
			toast.error(payload as string)
		})

		builder.addCase(addBookmark.fulfilled, (state, { payload }) => {
			const { msg, bookmarks } = payload
			toast.success(msg)
		})
		builder.addCase(addBookmark.rejected, (state, { payload }) => {
			toast.error(payload as string)
		})
	},
})

export const {} = BookmarkSlice.actions

export default BookmarkSlice.reducer
