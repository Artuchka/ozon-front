import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Default } from "./layouts/Default"
import { Landing } from "./pages/Landing"
import "./styles/main.scss"
import { Personal } from "./pages/Personal"
import { Products } from "./pages/Products"
import { SingleProduct } from "./pages/SingleProduct"
import { NotFound } from "./pages/NotFound"

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Default />}>
					<Route index element={<Landing />} />
					<Route path="/my/main" element={<Personal />} />
					<Route path="/products" element={<Products />} />
					<Route path="/products/:id" element={<SingleProduct />} />
					<Route path="*" element={<NotFound />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App
