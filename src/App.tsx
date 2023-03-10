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
import { Bookmarks } from "./pages/Bookmarks"
import { My } from "./layouts/My"
import { Reviews } from "./pages/Reviews"
import { MyProducts } from "./pages/MyProducts"
import { Cart } from "./pages/Cart"
import { Checkout } from "./pages/Checkout"
import { PaymentSuccess } from "./pages/PaymentSuccess"
import { Orders } from "./pages/Orders"
import { SingleOrder } from "./pages/SingleOrder"
import { AllStats } from "./pages/AllStats"
import { SingleStat } from "./pages/SingleStat"
import { EmailVerify } from "./pages/EmailVerify"

function App() {
	const user = useSelector(selectAuth)
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Default />}>
					<Route index element={<Landing />} />
					<Route
						path="/my"
						element={<ProtectedRoute user={user} outlet={<My />} />}
					>
						<Route path="main" element={<Personal />} />
						<Route path="reviews" element={<Reviews />} />
						<Route path="orders" element={<Orders />} />
						<Route
							path="orders/:orderId"
							element={<SingleOrder />}
						/>
						<Route
							path="products"
							element={
								<ProtectedRoute
									user={user}
									outlet={<MyProducts />}
									roles={["vendor"]}
								/>
							}
						/>
						<Route
							path="stats"
							element={
								<ProtectedRoute
									user={user}
									outlet={<AllStats />}
									roles={["vendor"]}
								/>
							}
						/>
						<Route
							path="stats/:productId"
							element={
								<ProtectedRoute
									user={user}
									outlet={<SingleStat />}
									roles={["vendor"]}
								/>
							}
						/>
					</Route>
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
					<Route
						path="/bookmarks"
						element={
							<ProtectedRoute
								user={user}
								outlet={<Bookmarks />}
							/>
						}
					/>
					<Route
						path="/cart"
						element={
							<ProtectedRoute user={user} outlet={<Cart />} />
						}
					/>
					<Route
						path="/checkout"
						element={
							<ProtectedRoute user={user} outlet={<Checkout />} />
						}
					/>
					<Route
						path="/paymentSuccess"
						element={
							<ProtectedRoute
								user={user}
								outlet={<PaymentSuccess />}
							/>
						}
					/>
					<Route path="/products" element={<Products />} />
					<Route path="/email" element={<EmailVerify />} />
					<Route path="/products/:id" element={<SingleProduct />} />
					<Route path="*" element={<NotFound />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App
