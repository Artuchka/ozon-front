import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Default } from "./layouts/Default"
import { Landing } from "./pages/Landing"
import "./styles/main.scss"

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Default />}>
					<Route index element={<Landing />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App
