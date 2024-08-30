import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-use-history";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [token, setToken] = useState(null);
	const [isAdmin, setIsAdmin] = useState(false);
	const history = useHistory();

	const adminEmail = __ADMIN__;

	useEffect(() => {
		const storedToken = localStorage.getItem("token");
		if (!storedToken) {
			history.push("/login");
		} else {
			setToken(storedToken);
		}
	}, [history]);

	useEffect(() => {
		const checkLoginStatus = async () => {
			try {
				const storedUser = JSON.parse(localStorage.getItem("agrisolveData"));
				if (!storedUser) {
					history.push("/login");
				} else {
					const response = await axios.get(
						`http://localhost:8000/auth/users/${storedUser.email}`,
						{
							headers: { "x-auth-token": storedUser.token },
						}
					);
					setUser(response.data);
					setToken(storedUser.token);
					setIsAdmin(response.data.email === adminEmail);
				}
			} catch (error) {
				console.error("Error checking login status:", error);
				history.push("/login");
			}
		};

		checkLoginStatus();
	}, [history]);

	return (
		<UserContext.Provider value={{ user, token, isAdmin }}>
			{children}
		</UserContext.Provider>
	);
};
