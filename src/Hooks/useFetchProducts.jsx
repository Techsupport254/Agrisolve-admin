import { useState, useEffect } from "react";
import axios from "axios";

export const useFetchProducts = (token, userId) => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await axios.get("http://localhost:8000/products", {
					headers: { "x-auth-token": token },
				});
				const filteredProducts = response.data.filter(
					(product) => product.refId === userId
				);
				setProducts(filteredProducts);
			} catch (error) {
				console.error("Error fetching products:", error);
			} finally {
				setLoading(false);
			}
		};

		if (token && userId) fetchProducts();
	}, [token, userId]);

	return { products, loading };
};
