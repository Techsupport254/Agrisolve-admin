import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { FinanceData } from "../Data";
import { useHistory } from "react-router-use-history";

const ApiContext = createContext();

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

	// Initialize user and token from local storage
	useEffect(() => {
		const storedUser = JSON.parse(localStorage.getItem("agrisolveData"));
		if (!storedUser) {
			history.push("/login");
		} else {
			setUser({ ...storedUser, _id: storedUser.id });
			setToken(storedUser.token);
		}
	}, [history]);

	// Fetch user data
	useEffect(() => {
		const fetchUserData = async () => {
			if (!token) return;
			try {
				const response = await axios.get(
					`http://localhost:8000/auth/users/${user?.email}`,
					{
						headers: { "x-auth-token": token },
					}
				);
				setUser(response.data);
			} catch (error) {
				console.error("Error fetching user data", error);
			}
		};
		fetchUserData();
	}, [token]);

	// Fetch other data (users, products, requests, chats, orders)
	useEffect(() => {
		if (!token || !user) return;

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
					axios.get("http://localhost:8000/products"),
					axios.get("http://localhost:8000/consults/consults", {
						headers: { "x-auth-token": token },
					}),
					axios.get("http://localhost:8000/chats/chats"),
					axios.get("http://localhost:8000/order"),
				]);

				setUsers(usersResponse.data);

				const filteredProducts = productsResponse.data.filter(
					(product) => product.refId === user._id
				);
				setProducts(filteredProducts);

				const filteredRequests = requestsResponse.data.filter(
					(request) => request.refId !== user._id
				);
				setRequests(filteredRequests);

				setChats(
					chatsResponse.data.filter((chat) => chat.recipient === user._id)
				);

				setOrders(ordersResponse.data);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching data", error);
				setLoading(false);
			}
		};

		fetchData();
	}, [token, user]);

	// Poll chats every 10 seconds
	useEffect(() => {
		if (!user) return;

		const fetchChats = async () => {
			try {
				const response = await axios.get("http://localhost:8000/chats/chats");
				setChats(response.data.filter((chat) => chat.recipient === user._id));
			} catch (error) {
				console.error("Error fetching chats", error);
			}
		};

		fetchChats();
		const interval = setInterval(fetchChats, 10000);
		return () => clearInterval(interval);
	}, [user]);

	// Set earnings once from static data
	useEffect(() => {
		setEarnings(FinanceData);
	}, []);

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

export const useApi = () => useContext(ApiContext);
export default ApiProvider;
