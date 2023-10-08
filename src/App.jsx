import React, { useState, useEffect } from "react";
import "./App.css";
import Sidebar from "./Components/Sidebar/Sidebar";
import Mainbar from "./Components/Mainbar/Mainbar";
import axios from "axios";
import { useHistory } from "react-router-use-history";

function App() {
	const [loggedIn, setLoggedIn] = useState(false);
	const [user, setUser] = useState(null);
	const [token, setToken] = useState(null);
	const [users, setUsers] = useState([]);
	const [products, setProducts] = useState(null);
	const [requests, setRequests] = useState(null);
	const history = useHistory();
	const [chats, setChats] = useState([]);

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
					setProducts(productsResponse.data);
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
					(request) => request.refId !== user._id
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
				setChats(response.data.filter((chat) => chat.recipient === user._id));
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
		(message) => message.status !== "read" && message.sender !== user._id
	).length;

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
				/>
			</div>
		</div>
	);
}

export default App;
