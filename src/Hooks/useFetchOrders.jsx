import { useState, useEffect } from "react";
import axios from "axios";

export const useFetchOrders = (token, userEmail, adminEmail, userId) => {
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchOrders = async () => {
			try {
				const url =
					userEmail === adminEmail
						? "http://localhost:8000/order"
						: `http://localhost:8000/order/owner/${userId}`;

				const response = await axios.get(url, {
					headers: { "x-auth-token": token },
				});
				setOrders(response.data);
			} catch (error) {
				console.error("Error fetching orders:", error);
			} finally {
				setLoading(false);
			}
		};

		if (token && userId) fetchOrders();
	}, [token, userEmail, adminEmail, userId]);

	return { orders, loading };
};
