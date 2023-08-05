import React, { lazy, Suspense, useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

const Dashboard = lazy(() => import("./Pages/Dashboard/Dashboard"));
const Users = lazy(() => import("./Pages/Users/Users"));
const Products = lazy(() => import("./Pages/Products/Products"));
const Reports = lazy(() => import("./Pages/Reports/Reports"));
const Requests = lazy(() => import("./Pages/Requests/Requests"));
const Settings = lazy(() => import("./Pages/Settings/Settings"));

const LoadingFallback = () => (
	<div className="SpinnerLoading">
		<i className="fa fa-spinner fa-spin" />
	</div>
);

const SidebarPages = ({ user, users, products, getTimeLabel, requests }) => {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(false);
	}, []);

	return (
		<React.Fragment>
			<Suspense fallback={<LoadingFallback />}>
				<Routes>
					<Route
						path="/"
						element={
							loading ? (
								<LoadingFallback />
							) : (
								<Dashboard
									user={user}
									products={products}
									getTimeLabel={getTimeLabel}
								/>
							)
						}
					/>
					<Route
						path="/users"
						element={
							loading ? (
								<LoadingFallback />
							) : (
								<Users user={user} users={users} getTimeLabel={getTimeLabel} />
							)
						}
					/>
					<Route
						path="/products"
						element={
							loading ? (
								<LoadingFallback />
							) : (
								<Products
									products={products}
									user={user}
									getTimeLabel={getTimeLabel}
								/>
							)
						}
					/>
					<Route
						path="/reports"
						element={loading ? <LoadingFallback /> : <Reports />}
					/>
					<Route
						path="/requests"
						element={
							loading ? <LoadingFallback /> : <Requests requests={requests} />
						}
					/>
					<Route
						path="/settings"
						element={loading ? <LoadingFallback /> : <Settings />}
					/>
				</Routes>
			</Suspense>
		</React.Fragment>
	);
};

export default SidebarPages;
