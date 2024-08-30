import { useState, useEffect } from "react";
import axios from "axios";

export const useFetchConsults = (token, userId) => {
	const [consults, setConsults] = useState([]);
	const [newRequestCount, setNewRequestCount] = useState(0);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchConsults = async () => {
			try {
				const response = await axios.get(
					"http://localhost:8000/consults/consults",
					{
						headers: { "x-auth-token": token },
					}
				);
				const filteredConsults = response.data.filter(
					(consult) => consult.refId !== userId
				);
				setConsults(filteredConsults);
			} catch (error) {
				console.error("Error fetching consults:", error);
			} finally {
				setLoading(false);
			}
		};

		if (token && userId) {
			fetchConsults();
		}
	}, [token, userId]);

	useEffect(() => {
		const fetchNewRequestCount = async () => {
			try {
				const response = await axios.get(
					`http://localhost:8000/consults/consults/unread/${userId}`,
					{
						headers: { "x-auth-token": token },
					}
				);
				setNewRequestCount(response.data);
			} catch (error) {
				console.error("Error fetching new request count:", error);
			}
		};

		if (token && userId) {
			fetchNewRequestCount();
			const interval = setInterval(fetchNewRequestCount, 500);
			return () => clearInterval(interval);
		}
	}, [token, userId]);

	return { consults, newRequestCount, loading };
};
