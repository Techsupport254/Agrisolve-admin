import { useState, useEffect } from "react";
import "./App.css";
import Sidebar from "./Components/Sidebar/Sidebar";
import Mainbar from "./Components/Mainbar/Mainbar";
import axios from "axios";
import { useHistory } from "react-router-use-history";
import { FinanceData } from "./Data";

function App() {
	// const [loggedIn, setLoggedIn] = useState(false);
	const [user, setUser] = useState(null);
	const [token, setToken] = useState(null);
	const [users, setUsers] = useState([]);
	const [products, setProducts] = useState(null);
	const [requests, setRequests] = useState(null);
	const history = useHistory();
	const [chats, setChats] = useState([]);
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);
	const [earnings, setEarnings] = useState([]);
	const [unseenCount, setUnseenCount] = useState(0);
	const [newRequestCount, setNewRequestCount] = useState(0);

	useEffect(() => {
		const path = "/login";
		const checkLoginStatus = async () => {
			const storedUser = JSON.parse(localStorage.getItem("agrisolveData"));
			if (!storedUser) {
				history.push(path);
			} else {
				try {
					const response = await axios.get(
						`http://localhost:8000/auth/users/${storedUser.email}`,
						{
							headers: {
								"x-auth-token": storedUser.token,
							},
						}
					);

					if (response.data) {
						setUser(response.data);
						setToken(storedUser.token);
					}
				} catch (error) {
					console.error("Error checking login status", error);
					history.push(path);
				}
			}
		};

		checkLoginStatus();
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			try {
				if (token) {
					// Fetch all users
					const usersResponse = await axios.get(
						"http://localhost:8000/auth/users",
						{
							headers: {
								"x-auth-token": token,
							},
						}
					);
					setUsers(usersResponse.data);

					// Fetch products
					const productsResponse = await axios.get(
						"http://localhost:8000/products"
					);
					// where refId === user._id
					const filteredProducts = productsResponse.data.filter(
						(product) => product.refId === user?._id
					);
					setProducts(filteredProducts);
				}
			} catch (err) {
				console.log(err);
			}
		};

		fetchData();
	}, [token, user?._id]);

	const getTimeLabel = (time) => {
		const timeDiffInMilliseconds = Date.now() - new Date(time).getTime();
		const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
		const oneHourInMilliseconds = 60 * 60 * 1000;
		const oneMinuteInMilliseconds = 60 * 1000;

		if (timeDiffInMilliseconds < oneMinuteInMilliseconds) {
			return `${Math.floor(timeDiffInMilliseconds / 1000)} secs ago`;
		} else if (timeDiffInMilliseconds < oneHourInMilliseconds) {
			return `${Math.floor(
				timeDiffInMilliseconds / oneMinuteInMilliseconds
			)} mins ago`;
		} else if (timeDiffInMilliseconds < oneDayInMilliseconds) {
			return `${Math.floor(
				timeDiffInMilliseconds / oneHourInMilliseconds
			)} hours ago`;
		} else if (timeDiffInMilliseconds < 2 * oneDayInMilliseconds) {
			return "Yesterday";
		} else if (timeDiffInMilliseconds < 3 * oneDayInMilliseconds) {
			return `${Math.floor(
				timeDiffInMilliseconds / oneDayInMilliseconds
			)} days ago`;
		} else {
			// Display the actual date without minutes, hours, or seconds
			return new Date(time).toLocaleString("en-US", {
				year: "numeric",
				month: "short",
				day: "numeric",
			});
		}
	};

	useEffect(() => {
		const fetchRequest = async () => {
			try {
				const response = await axios.get(
					"http://localhost:8000/consults/consults",
					{
						headers: {
							"x-auth-token": token,
						},
					}
				);
				const filteredRequests = response.data.filter(
					(request) => request.refId !== user?._id
				);
				setRequests(filteredRequests);
			} catch (err) {
				console.log(err);
			}
		};

		if (user) {
			fetchRequest();
		}
	}, [user, token]);

	// New request count http://localhost:8000/consults/consults/unread/:id
	useEffect(() => {
		const fetchNewRequestCount = async () => {
			try {
				const response = await axios.get(
					`http://localhost:8000/consults/consults/unread/${user?._id}`,
					{
						headers: {
							"x-auth-token": token,
						},
					}
				);
				setNewRequestCount(response.data);
			} catch (error) {
				console.error("Error fetching new request count", error);
			}
		};
		if (user && token) {
			fetchNewRequestCount();
			const interval = setInterval(fetchNewRequestCount, 500);
			return () => clearInterval(interval);
		}
	}, [user, token]);

	// Fetch chats
	useEffect(() => {
		const fetchChats = async () => {
			try {
				const response = await axios.get(
					`http://localhost:8000/chats/chats/user/${user?._id}`,
					{
						headers: {
							"x-auth-token": token,
						},
					}
				);
				setChats(response.data);
			} catch (error) {
				console.error("Error fetching chats", error);
			}
		};
		if (user && token) {
			fetchChats();
			const interval = setInterval(fetchChats, 500);
			return () => clearInterval(interval);
		}
	}, [user, token]);

	// Messages map
	const messagesMap = new Map();
	chats.forEach((chat) => {
		messagesMap.set(chat.refId, chat?.conversations[0].messages);
	});
	const messages = Array.from(messagesMap.values()).flat();

	// Unseen messages count
	// fetch here http://localhost:8000/chats/unread/:id

	useEffect(() => {
		const fetchUnseenCount = async () => {
			try {
				const response = await axios.get(
					`http://localhost:8000/chats/unread/${user?._id}`,
					{
						headers: {
							"x-auth-token": token,
						},
					}
				);
				setUnseenCount(response.data);
			} catch (error) {
				console.error("Error fetching unseen messages count", error);
			}
		};
		if (user && token) {
			fetchUnseenCount();
			const interval = setInterval(fetchUnseenCount, 500);
			return () => clearInterval(interval);
		}
	}, [user, token]);

	// Fetch orders
	useEffect(() => {
		const fetchOrders = async () => {
			try {
				const response = await axios.get("http://localhost:8000/orders");
				setOrders(response.data);
				setLoading(false);
			} catch (error) {
				console.log(error);
			}
		};
		if (user) {
			fetchOrders();
		}
	}, [user]);

	// Get customer by userId
	const getCustomer = (userId) => {
		return users.find((user) => user._id === userId) || null;
	};

	// Get product by productId
	const getProduct = (productId) => {
		return products.find((product) => product._id === productId) || null;
	};

	// Sort orders by date
	orders.sort((a, b) => new Date(b.date) - new Date(a.date));

	// Filter products to display where ownerId === user._id
	orders.forEach((order) => {
		order.products = order.products.filter(
			(product) => product.ownerId === user?._id
		);
	});

	// Set earnings once from static data
	useEffect(() => {
		setEarnings(FinanceData);
	}, []);

	return (
		<div className="App flex flex-col md:flex-row w-full h-screen">
			<div className="Sidebar w-1/2 md:w-1/5 p-1 border-r-2 bg-slate-800 text-white">
				<Sidebar
					user={user}
					unseenCount={unseenCount}
					newRequestCount={newRequestCount}
				/>
			</div>
			<div className="Mainbar w-full md:w-4/5 p-1 border-r-2 bg-white text-black">
				<Mainbar
					user={user}
					users={users}
					products={products}
					getTimeLabel={getTimeLabel}
					requests={requests}
					chats={chats}
					setChats={setChats}
					messages={messages}
					orders={orders}
					getCustomer={getCustomer}
					getProduct={getProduct}
					loading={loading}
					earnings={earnings}
				/>
			</div>
		</div>
	);
}

export default App;
