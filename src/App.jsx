import { useState, useEffect } from "react";
import "./App.css";
import Sidebar from "./Components/Sidebar/Sidebar";
import Mainbar from "./Components/Mainbar/Mainbar";
import axios from "axios";
import { useHistory } from "react-router-use-history";

function useAuth() {
	const [loggedIn, setLoggedIn] = useState(false);
	const [user, setUser] = useState(null);
	const [token, setToken] = useState(null);
	const history = useHistory();

	useEffect(() => {
		const storedUser = JSON.parse(localStorage.getItem("agrisolveData"));
		if (!storedUser || storedUser.loginStatus !== "loggedIn") {
			history.push(
				"https://64ceabd3dad64a69c92babad--agrisolve.netlify.app/login"
			);
		} else {
			setUser(storedUser);
			setToken(storedUser.token);
			setLoggedIn(true);
		}
	}, [history]);

	return { loggedIn, user, token };
}

function App() {
	const { loggedIn, user, token } = useAuth();
	const [users, setUsers] = useState([]);
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
		fetchAllUsers();
	}, [token]);

	useEffect(() => {
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

		const timeDiffInMilliseconds = Date.now() - date.getTime();
		const oneDayInMilliseconds = 24 * 60 * 60 * 1000;

		if (timeDiffInMilliseconds >= 3 * oneDayInMilliseconds) {
			return date.toLocaleString("en-US", {
				...options,
				hour: undefined,
				minute: undefined,
				second: undefined,
			});
		} else if (timeDiffInMilliseconds >= 2 * oneDayInMilliseconds) {
			return "Yesterday";
		} else if (timeDiffInMilliseconds >= oneDayInMilliseconds) {
			return `${Math.floor(
				timeDiffInMilliseconds / oneDayInMilliseconds
			)} days ago`;
		} else if (timeDiffInMilliseconds >= 60 * 60 * 1000) {
			return `${Math.floor(
				timeDiffInMilliseconds / (60 * 60 * 1000)
			)} hours ago`;
		} else if (timeDiffInMilliseconds >= 60 * 1000) {
			return `${Math.floor(timeDiffInMilliseconds / (60 * 1000))} minutes ago`;
		} else if (timeDiffInMilliseconds >= 1000) {
			return `${Math.floor(timeDiffInMilliseconds / 1000)} seconds ago`;
		}

		return date.toLocaleString("en-US", options);
	};

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
				"https://agrisolve-techsupport254.vercel.app/consults/consults",
				"GET"
			);
		}
	}, [user]);

	return (
		<div className="App flex flex-col md:flex-row w-full h-screen">
			<div className="Sidebar w-1/2 md:w-1/5 p-1 border-r-2 bg-slate-800 text-white">
				{loggedIn && <Sidebar user={user} />}
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
