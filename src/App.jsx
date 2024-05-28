import { useState, useEffect } from "react";
import "./App.css";
import Sidebar from "./Components/Sidebar/Sidebar";
import Mainbar from "./Components/Mainbar/Mainbar";
import axios from "axios";
import { useHistory } from "react-router-use-history";
import { FinanceData } from "./Data";

function App() {
	const [loggedIn, setLoggedIn] = useState(false);
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

	useEffect(() => {
		const path = "/login";
		const checkLoginStatus = async () => {
			const storedUser = JSON.parse(localStorage.getItem("agrisolveData"));
			if (!storedUser) {
				history.push(path);
			} else {
				try {
					const response = await axios.get(
						`https://agrisolve-techsupport254.vercel.app/auth/user/${storedUser.email}`,
						{
							headers: {
								"x-auth-token": storedUser.token,
							},
						}
					);

					if (response.data.loginStatus === "loggedIn") {
						setUser(response.data);
						setToken(storedUser.token);
						setLoggedIn(true);
					} else if (response.data.loginStatus === "loggedOut") {
						console.log("User logged out");
						history.push(path);
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
						"https://agrisolve-techsupport254.vercel.app/auth/users",
						{
							headers: {
								"x-auth-token": token,
							},
						}
					);
					setUsers(usersResponse.data);

					// Fetch products
					const productsResponse = await axios.get(
						"https://agrisolve-techsupport254.vercel.app/products"
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
	}, [token]);

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
		const fetchRequest = async (url, method, data) => {
			try {
				const response = await axios({
					url,
					method,
					data,
					headers: {
						"x-auth-token": token,
					},
				});
				const filteredRequests = response.data.filter(
					(request) => request.refId !== user?._id
				);
				setRequests(filteredRequests);
			} catch (err) {
				console.log(err);
			}
		};

		if (user) {
			fetchRequest(
				"https://agrisolve-techsupport254.vercel.app/consults/consults",
				"GET"
			);
		}
	}, [user, token]);

	// new request count
	const newRequestCount = requests?.filter(
		(request) => request.newConsult === true
	).length;

	// fetch chats
	useEffect(() => {
		const fetchChats = async () => {
			try {
				const response = await axios.get(
					"https://agrisolve-techsupport254.vercel.app/chats/chats"
				);
				setChats(response.data.filter((chat) => chat.recipient === user?._id));
			} catch (error) {
				console.error("Error fetching chats", error);
			}
		};

		fetchChats();

		const interval = setInterval(fetchChats, 1000);

		return () => clearInterval(interval);
	}, [user?._id]);

	// messages map
	const messagesMap = new Map();

	chats.forEach((chat) => {
		messagesMap.set(chat.refId, chat?.conversations[0].messages);
	});

	// flatten messages
	const messages = Array.from(messagesMap.values()).flat();
	const unseenCount = messages.filter(
		(message) => message.status !== "read" && message.sender !== user?._id
	).length;

	// Fetch orders
	const fetchOrders = async () => {
		try {
			const response = await axios.get("https://agrisolve.vercel.app/order");
			setOrders(response.data);
			setLoading(false);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchOrders();
	}, [user?._id]);
	// Function to get user by userId
	const getCustomer = (userId) => {
		if (!users) return null;
		return users.find((user) => user?._id === userId);
	};

	// Function to get product by productId
	const getProduct = (productId) => {
		if (!products) return null;
		return products.find((product) => product?._id === productId);
	};

	// sort orders by date
	orders.sort((a, b) => {
		return new Date(b.date) - new Date(a.date);
	});

	// filter products to display where ownerId === user._id
	orders.forEach((order) => {
		order.products = order.products.filter(
			(product) => product?.ownerId === user?._id
		);
	});

	// fetch earnings
	// useEffect(() => {
	// 	const fetchEarnings = async () => {
	// 		try {
	// 			// Here, you will replace FinanceData with your actual endpoint to fetch finance data
	// 			const response = await axios.get("Your_Finance_Data_Endpoint");

	// 			// Assuming finance data contains earnings information
	// 			// Modify this according to the structure of your finance data
	// 			const earningsData = response.data.map((entry) => ({
	// 				month: entry.month,
	// 				income: entry.income,
	// 				expense: entry.expense,
	// 			}));

	// 			setEarnings(earningsData);
	// 		} catch (error) {
	// 			console.error("Error fetching earnings", error);
	// 		}
	// 	};

	// 	fetchEarnings();
	// }, []);

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
