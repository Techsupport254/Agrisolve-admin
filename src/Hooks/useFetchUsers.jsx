import { useState, useEffect } from "react";
import axios from "axios";

export const useFetchUsers = (token) => {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await axios.get("http://localhost:8000/auth/users", {
					headers: { "x-auth-token": token },
				});
				setUsers(response.data);
			} catch (error) {
				console.error("Error fetching users:", error);
			} finally {
				setLoading(false);
			}
		};

		if (token) fetchUsers();
	}, [token]);

	return { users, loading };
};
