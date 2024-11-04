import { useState, useEffect } from "react";
import "./App.css";
import Sidebar from "./Components/Sidebar/Sidebar";
import Mainbar from "./Components/Mainbar/Mainbar";
import { getTimeLabel } from "./Utils/getTimeLabel";
import axios from "axios";

// Custom JWT Decoder
const decodeJWT = (token) => {
	try {
		const base64Url = token.split(".")[1];
		const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
		const jsonPayload = decodeURIComponent(
			atob(base64)
				.split("")
				.map((c) => `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`)
				.join("")
		);
		return JSON.parse(jsonPayload);
	} catch (e) {
		return null;
	}
};

function App() {
	const [user, setUser] = useState(null);
	const [token, setToken] = useState(null);
	const [loading, setLoading] = useState(true);
	const [isAdmin, setIsAdmin] = useState(false);
	const [users, setUsers] = useState([]);
	const [products, setProducts] = useState([]);
	const [discounts, setDiscounts] = useState([]);
	const [consults, setConsults] = useState([]);
	const [orders, setOrders] = useState([]);
	const [earnings, setEarnings] = useState([]);

	const adminEmail = __ADMIN__;

	// Function to handle token expiration or invalidation
	const handleInvalidToken = () => {
		localStorage.removeItem("token");
		window.location.href = "/login";
	};

	// Token check and user setup
	useEffect(() => {
		const storedToken = localStorage.getItem("token");
		if (window.location.pathname !== "/login") {
			if (storedToken) {
				const decodedToken = decodeJWT(storedToken);
				if (decodedToken && decodedToken.exp > Date.now() / 1000) {
					setToken(storedToken);
					setUser(decodedToken);
					setIsAdmin(decodedToken.email === adminEmail);
				} else {
					handleInvalidToken();
				}
			} else {
				window.location.href = "/login";
			}
		} else {
			setLoading(false);
		}
	}, [adminEmail]);

	// Fetch data after user and token are set
	useEffect(() => {
		if (user && token) {
			const fetchData = async () => {
				try {
					const usersResponse = await axios.get(
						"http://localhost:8000/auth/users",
						{
							headers: {
								Authorization: `Bearer ${token}`,
							},
						}
					);
					setUsers(usersResponse.data);

					const productsResponse = await axios.get(
						"http://localhost:8000/products",
						{
							headers: {
								Authorization: `Bearer ${token}`,
							},
						}
					);
					setProducts(productsResponse.data);

					const discountsResponse = await axios.get(
						"http://localhost:8000/discounts",
						{
							headers: {
								Authorization: `Bearer ${token}`,
							},
						}
					);
					setDiscounts(discountsResponse.data);

					const consultsResponse = await axios.get(
						"http://localhost:8000/consults",
						{
							headers: {
								Authorization: `Bearer ${token}`,
							},
						}
					);
					setConsults(consultsResponse.data);

					const ordersResponse = await axios.get(
						"http://localhost:8000/order",
						{
							headers: {
								Authorization: `Bearer ${token}`,
							},
						}
					);
					setOrders(ordersResponse.data);

					const earningsResponse = await axios.get(
						"http://localhost:8000/earnings",
						{
							headers: {
								Authorization: `Bearer ${token}`,
							},
						}
					);
					setEarnings(earningsResponse.data);
				} catch (err) {
					console.error(err);
					if (err.response?.status === 401 || err.response?.status === 403) {
						handleInvalidToken();
					}
				} finally {
					setLoading(false);
				}
			};

			fetchData();
		}
	}, [user, token]);

	// console.log(token);

	return (
		<div className="App flex flex-col md:flex-row w-full h-screen">
			<div className="Sidebar w-1/2 md:w-1/5 p-1 border-r-2 bg-slate-800 text-white">
				<Sidebar user={user} unseenCount={0} newRequestCount={0} />
			</div>
			<div className="Mainbar w-full md:w-4/5 p-1 border-r-2 bg-white text-black">
				<Mainbar
					user={user}
					users={users}
					products={products}
					getTimeLabel={getTimeLabel}
					requests={consults}
					orders={orders}
					chats={[]} // Empty array as we're not fetching chats
					setChats={() => {}} // No-op function
					messages={[]} // Empty array as we're not fetching messages
					allDiscounts={discounts}
					loading={loading}
					earnings={earnings}
				/>
			</div>
		</div>
	);
}

export default App;
