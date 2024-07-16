import { createContext, useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { FinanceData } from "../Data";
import { useHistory } from "react-router-use-history";

// Create context
const ApiContext = createContext();

export const useApi = () => {
	return useContext(ApiContext);
};

// Create provider
export const ApiProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [token, setToken] = useState(null);
	const [users, setUsers] = useState([]);
	const [products, setProducts] = useState([]);
	const [requests, setRequests] = useState([]);
	const [chats, setChats] = useState([]);
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);
	const [earnings, setEarnings] = useState([]);
	const history = useHistory();

	const hasFetchedUserData = useRef(false);
	const hasFetchedInitialData = useRef(false);

	// Initialize user and token from local storage
	useEffect(() => {
		const storedUser = localStorage.getItem("agrisolveData");
		if (storedUser) {
			try {
				const parsedUser = JSON.parse(storedUser);
				setUser({ ...parsedUser, _id: parsedUser.id || parsedUser._id });
				setToken(parsedUser.token);
			} catch (error) {
				console.error("Error parsing stored user data", error);
			}
		} else {
			history.push("/login");
		}
		// This effect should only run once, hence empty dependency array
	}, [history]);

	// Fetch user data
	useEffect(() => {
		if (!token || hasFetchedUserData.current) return;

		const fetchUserData = async () => {
			try {
				const response = await axios.get(
					`http://localhost:8000/auth/users/${user?.email}`,
					{
						headers: { "x-auth-token": token },
					}
				);
				setUser({
					...response.data,
					_id: response.data._id || response.data.id,
				});
				hasFetchedUserData.current = true;
			} catch (error) {
				console.error("Error fetching user data", error);
			}
		};
		fetchUserData();
	}, [token, user?.email]);

	// Fetch other data (users, products, requests, chats, orders)
	useEffect(() => {
		if (!token || !user || hasFetchedInitialData.current) return;

		const fetchData = async () => {
			try {
				const [
					usersResponse,
					productsResponse,
					requestsResponse,
					chatsResponse,
					ordersResponse,
				] = await Promise.all([
					axios.get("http://localhost:8000/auth/users", {
						headers: { "x-auth-token": token },
					}),
					axios.get("http://localhost:8000/products", {
						headers: { "x-auth-token": token },
					}),
					axios.get("http://localhost:8000/requests", {
						headers: { "x-auth-token": token },
					}),
					axios.get("http://localhost:8000/chats", {
						headers: { "x-auth-token": token },
					}),
					axios.get("http://localhost:8000/orders", {
						headers: { "x-auth-token": token },
					}),
				]);

				setUsers(usersResponse.data);
				setProducts(productsResponse.data);
				setRequests(requestsResponse.data);
				setChats(chatsResponse.data);
				setOrders(ordersResponse.data);
				hasFetchedInitialData.current = true;
			} catch (error) {
				console.error("Error fetching data", error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();

		// Cleanup function to cancel ongoing requests if component unmounts
		return () => {
			axios.CancelToken.source().cancel("Component unmounted");
		};
	}, [token, user]);

	// Set earnings once from static data
	useEffect(() => {
		setEarnings(FinanceData);
	}, []);

	// Get time label
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
		} else {
			return new Date(time).toLocaleString("en-US", {
				year: "numeric",
				month: "short",
				day: "numeric",
			});
		}
	};

	const getCustomer = (userId) => {
		return users.find((user) => user._id === userId) || null;
	};

	const getProduct = (productId) => {
		return products.find((product) => product._id === productId) || null;
	};

	return (
		<ApiContext.Provider
			value={{
				user,
				users,
				products,
				requests,
				chats,
				orders,
				loading,
				earnings,
				getTimeLabel,
				getCustomer,
				getProduct,
			}}
		>
			{children}
		</ApiContext.Provider>
	);
};

export default ApiProvider;
