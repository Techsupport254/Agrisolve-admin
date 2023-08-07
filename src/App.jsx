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
	}, [history]);

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
						"https://api.escuelajs.co/api/v1/products"
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
		const timeLabels = [
			[3 * oneDayInMilliseconds, "Yesterday"],
			[
				2 * oneDayInMilliseconds,
				`${Math.floor(timeDiffInMilliseconds / oneDayInMilliseconds)} days ago`,
			],
			[
				oneDayInMilliseconds,
				`${Math.floor(timeDiffInMilliseconds / (60 * 60 * 1000))} hours ago`,
			],
			[
				60 * 60 * 1000,
				`${Math.floor(timeDiffInMilliseconds / (60 * 1000))} minutes ago`,
			],
			[60 * 1000, `${Math.floor(timeDiffInMilliseconds / 1000)} seconds ago`],
		];

		for (const [threshold, label] of timeLabels) {
			if (timeDiffInMilliseconds >= threshold) {
				return label;
			}
		}

		return new Date(time).toLocaleString("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
			hour: "numeric",
			minute: "numeric",
			second: "numeric",
			hour12: false,
		});
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
				setRequests(response.data);
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

	return (
		<div className="App flex flex-col md:flex-row w-full h-screen">
			<div className="Sidebar w-1/2 md:w-1/5 p-1 border-r-2 bg-slate-800 text-white">
				<Sidebar user={user} />
			</div>
			<div className="Mainbar w-full md:w-4/5 p-1 border-r-2 bg-white text-black">
				<Mainbar
					user={user}
					users={users}
					products={products}
					getTimeLabel={getTimeLabel}
					requests={requests}
				/>
			</div>
		</div>
	);
}

export default App;
