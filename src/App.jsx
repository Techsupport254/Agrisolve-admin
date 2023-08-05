import { useState, useEffect } from "react";
import "./App.css";
import Sidebar from "./Components/Sidebar/Sidebar";
import Mainbar from "./Components/Mainbar/Mainbar";
import axios from "axios";

function App() {
	const [loggedIn, setLoggedIn] = useState(false);
	const [user, setUser] = useState(null);
	const [token, setToken] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState(null);
	const [success, setSuccess] = useState(false);
	const [users, setUsers] = useState([]);
	const [userData, setUserData] = useState(null);
	const [userDataLoaded, setUserDataLoaded] = useState(false);
	const [products, setProducts] = useState(null);
	const [requests, setRequests] = useState(null);

	const fetchAllUsers = async () => {
		try {
			const response = await axios.get(
				"https://agrisolve-techsupport254.vercel.app/auth/users",
				{
					headers: {
						"x-auth-token": token,
					},
				}
			);
			setUsers(response.data);
		} catch (err) {
			console.log(err);
			setError("Error fetching users.");
		}
	};

	useEffect(() => {
		const fetchUserData = async () => {
			const storedUser = JSON.parse(localStorage.getItem("agrisolveData"));
			if (storedUser) {
				try {
					const response = await axios.get(
						`https://agrisolve-techsupport254.vercel.app/auth/user/${storedUser.email}`,
						{
							headers: {
								"x-auth-token": storedUser.token,
							},
						}
					);

					setUser(response.data);

					if (response.data.loginStatus === "loggedIn") {
						setLoggedIn(true);
					}
				} catch (err) {
					console.log(err);
				}
			}

			setUserDataLoaded(true);
		};

		fetchUserData();
		fetchAllUsers();
	}, [token, userData]);

	const fetchProducts = async () => {
		try {
			const resData = await axios.get(
				"https://api.escuelajs.co/api/v1/products"
			);
			setProducts(resData.data);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	const getTimeLabel = (time) => {
		const date = new Date(time);
		const options = {
			year: "numeric",
			month: "short",
			day: "numeric",
			hour: "numeric",
			minute: "numeric",
			second: "numeric",
			hour12: false,
		};

		// Calculate the time difference in milliseconds
		const timeDiffInMilliseconds = Date.now() - date.getTime();
		const oneDayInMilliseconds = 24 * 60 * 60 * 1000;

		// If the time difference is more than 3 days, format the date without the time
		if (timeDiffInMilliseconds >= 3 * oneDayInMilliseconds) {
			return date.toLocaleString("en-US", {
				...options,
				hour: undefined,
				minute: undefined,
				second: undefined,
			});
		} else if (timeDiffInMilliseconds >= 2 * oneDayInMilliseconds) {
			// If the time difference is more than 1 day, but not more than 3 days, show "Yesterday"
			return "Yesterday";
		} else if (timeDiffInMilliseconds >= oneDayInMilliseconds) {
			// If the time difference is less than 1 day, show "x days ago"
			return `${Math.floor(
				timeDiffInMilliseconds / oneDayInMilliseconds
			)} days ago`;
		} else if (timeDiffInMilliseconds >= 60 * 60 * 1000) {
			// If the time difference is less than 1 day, show "x hours ago"
			return `${Math.floor(
				timeDiffInMilliseconds / (60 * 60 * 1000)
			)} hours ago`;
		} else if (timeDiffInMilliseconds >= 60 * 1000) {
			// If the time difference is less than 1 hour, but more than 1 minute, show "x minutes ago"
			return `${Math.floor(timeDiffInMilliseconds / (60 * 1000))} minutes ago`;
		} else if (timeDiffInMilliseconds >= 1000) {
			// If the time difference is less than 1 minute, but more than 1 second, show "x seconds ago"
			return `${Math.floor(timeDiffInMilliseconds / 1000)} seconds ago`;
		}

		// If the time difference is less than 1 second, show the exact date and time
		return date.toLocaleString("en-US", options);
	};

	// requests

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

	useEffect(() => {
		if (user) {
			fetchRequest(
				`https://agrisolve-techsupport254.vercel.app/consults/consults`,
				"GET"
			);
		}
	}, [user]);

	return (
		<div className="App flex flex-col md:flex-row w-full h-screen">
			<div className="Sidebar w-1/2 md:w-1/5 p-1 border-r-2 bg-slate-800 text-white">
				<Sidebar user={user} />
			</div>
			<div className="Mainbar w-full md:w-4/5 p-1 border-r-2 bg-slate-200 text-black">
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
