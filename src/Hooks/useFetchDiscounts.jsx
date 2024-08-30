import { useState, useEffect } from "react";
import axios from "axios";

export const useFetchDiscounts = (token, user, isAdmin) => {
	const [allDiscounts, setAllDiscounts] = useState([]);
	const [userDiscounts, setUserDiscounts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchDiscounts = async () => {
			try {
				let url = isAdmin
					? "http://localhost:8000/discounts"
					: `http://localhost:8000/discounts/user/${user?._id}`;

				const response = await axios.get(url, {
					headers: { "x-auth-token": token },
				});

				if (isAdmin) {
					setAllDiscounts(response.data);
				} else {
					setUserDiscounts(response.data);
					setAllDiscounts(response.data);
				}
			} catch (error) {
				console.error("Error fetching discounts:", error);
			} finally {
				setLoading(false);
			}
		};

		if (token && user) {
			fetchDiscounts();
		}
	}, [token, user, isAdmin]);

	return { allDiscounts, userDiscounts, loading };
};
