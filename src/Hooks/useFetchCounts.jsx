import { useState, useEffect } from "react";
import axios from "axios";

export const useFetchCounts = (token, userId) => {
	const [unseenCount, setUnseenCount] = useState(0);
	const [newRequestCount, setNewRequestCount] = useState(0);

	useEffect(() => {
		const fetchCounts = async () => {
			try {
				const unseenResponse = await axios.get(
					`http://localhost:8000/chats/unread/${userId}`,
					{ headers: { "x-auth-token": token } }
				);
				setUnseenCount(unseenResponse.data);

				const requestCountResponse = await axios.get(
					`http://localhost:8000/consults/consults/unread/${userId}`,
					{ headers: { "x-auth-token": token } }
				);
				setNewRequestCount(requestCountResponse.data);
			} catch (error) {
				console.error("Error fetching counts:", error);
			}
		};

		if (token && userId) {
			fetchCounts();
			const interval = setInterval(fetchCounts, 500);
			return () => clearInterval(interval);
		}
	}, [token, userId]);

	return { unseenCount, newRequestCount };
};
