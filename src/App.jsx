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
		const checkLoginStatus = async () => {
			const storedUser = JSON.parse(localStorage.getItem("agrisolveData"));
			if (!storedUser) {
				history.push(
					"https://64ceb593a3461a6e1947eb37--agrisolve.netlify.app/login"
				);
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
						setUser(storedUser);
						setToken(storedUser.token);
						setLoggedIn(true);
					} else {
						history.push(
							"https://64ceb593a3461a6e1947eb37--agrisolve.netlify.app/login"
						);
					}
				} catch (error) {
					console.error("Error checking login status", error);
					history.push(
						"https://64ceb593a3461a6e1947eb37--agrisolve.netlify.app/login"
					);
				}
			}
		};

		checkLoginStatus();
	}, [history]);

	return { loggedIn, user, token };
}

function App() {
	const { loggedIn, user, token } = useAuth();
	const [users, setUsers] = useState([]);
	const [userDataLoaded, setUserDataLoaded] = useState(false);
	const [products, setProducts] = useState(null);
	const [requests, setRequests] = useState(null);

	useEffect(() => {
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
		// ... (rest of the code remains the same)
	};

	const fetchRequest = async (url, method, data) => {
		// ... (rest of the code remains the same)
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
