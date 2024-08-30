import React, { createContext, useContext } from "react";
import { UserContext } from "./UserContext";
import { useFetchUsers } from "../Hooks/useFetchUsers";
import { useFetchOrders } from "../Hooks/useFetchOrders";
import { useFetchCounts } from "../Hooks/useFetchCounts";
import { useFetchProducts } from "../Hooks/useFetchProducts";
import { useFetchDiscounts } from "../Hooks/useFetchDiscounts";
import { useFetchConsults } from "../Hooks/useFetchConsults";
import { FinanceData } from "../Data";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
	const { user, token, isAdmin } = useContext(UserContext);

	const { users, loading: usersLoading } = useFetchUsers(token);
	const { products, loading: productsLoading } = useFetchProducts(
		token,
		user?._id
	);
	const { orders, loading: ordersLoading } = useFetchOrders(
		token,
		user?.email,
		__ADMIN__,
		user?._id
	);
	const { unseenCount, newRequestCount } = useFetchCounts(token, user?._id);
	const {
		allDiscounts,
		userDiscounts,
		loading: discountsLoading,
	} = useFetchDiscounts(token, user, isAdmin);
	const { consults, loading: consultsLoading } = useFetchConsults(
		token,
		user?._id
	);

	const loading =
		usersLoading ||
		productsLoading ||
		ordersLoading ||
		discountsLoading ||
		consultsLoading;

	return (
		<AppContext.Provider
			value={{
				users,
				products,
				orders,
				loading,
				unseenCount,
				newRequestCount,
				earnings: FinanceData,
				allDiscounts,
				userDiscounts,
				consults,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
