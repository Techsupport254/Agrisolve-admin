import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-use-history";

const useAuth = () => {
	const [user, setUser] = useState(null);
	const [token, setToken] = useState(null);
	const history = useHistory();

	useEffect(() => {
		const checkLoginStatus = async () => {
			const storedUser = JSON.parse(localStorage.getItem("agrisolveData"));
			if (!storedUser) {
				history.push("/login");
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
					history.push("/login");
				}
			}
		};

		checkLoginStatus();
	}, [history]);

	return { user, token };
};

export default useAuth;
