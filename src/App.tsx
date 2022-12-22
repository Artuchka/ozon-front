import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Default } from "./layouts/Default"
import { Landing } from "./pages/Landing"
import "./styles/main.scss"
import { Personal } from "./pages/Personal"
import { Products } from "./pages/Products"
import { SingleProduct } from "./pages/SingleProduct"
import { NotFound } from "./pages/NotFound"
import { useDispatch, useSelector } from "react-redux"
import { selectAuth } from "./store/features/auth/selectors"
import { ProtectedRoute } from "./pages/ProtectedRoute"
import { CreateNew } from "./pages/CreateNew"

function App() {
	const user = useSelector(selectAuth)
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Default />}>
					<Route index element={<Landing />} />
					<Route
						path="/my/main"
						element={
							<ProtectedRoute user={user} outlet={<Personal />} />
						}
					/>
					<Route
						path="/create-new"
						element={
							<ProtectedRoute
								roles={["vendor"]}
								user={user}
								outlet={<CreateNew />}
							/>
						}
					/>
					<Route path="/products" element={<Products />} />
					<Route path="/products/:id" element={<SingleProduct />} />
					<Route path="*" element={<NotFound />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App
