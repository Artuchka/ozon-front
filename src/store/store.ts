import { configureStore } from "@reduxjs/toolkit"
import auth from "./features/auth/authSlice"
import product from "./features/product/productSlice"
import reviews from "./features/review/reviewSlice"
import filter from "./features/filter/filterSlice"

export const store = configureStore({
	reducer: { auth, product, reviews, filter },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
