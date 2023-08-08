import React, { lazy, Suspense, useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Profile from "./Pages/Profile/Profile";
import NotFound from "./Components/404/NotFound";

const Dashboard = lazy(() => import("./Pages/Dashboard/Dashboard"));
const Users = lazy(() => import("./Pages/Users/Users"));
const Products = lazy(() => import("./Pages/Products/Products"));
const Reports = lazy(() => import("./Pages/Reports/Reports"));
const Requests = lazy(() => import("./Pages/Requests/Requests"));
const Login = lazy(() => import("./Components/Login/Login"));
const NewProduct = lazy(() => import("./Components/NewProduct/NewProduct"));

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
						element={
							loading ? (
								<LoadingFallback />
							) : (
								<Reports user={user} getTimeLabel={getTimeLabel} />
							)
						}
					/>
					<Route
						path="/requests"
						element={
							loading ? (
								<LoadingFallback />
							) : (
								<Requests
									requests={requests}
									user={user}
									getTimeLabel={getTimeLabel}
								/>
							)
						}
					/>
					<Route
						path="/user"
						element={
							loading ? (
								<LoadingFallback />
							) : (
								<Profile user={user} getTimeLabel={getTimeLabel} />
							)
						}
					/>
					<Route
						path="/login"
						element={
							loading ? (
								<LoadingFallback />
							) : (
								<Login user={user} users={users} getTimeLabel={getTimeLabel} />
							)
						}
					/>
					<Route
						path="products/new"
						element={
							loading ? (
								<LoadingFallback />
							) : (
								<NewProduct user={user} getTimeLabel={getTimeLabel} />
							)
						}
					/>
					{/* 404 */}
					<Route
						path="*"
						element={
							loading ? (
								<LoadingFallback />
							) : (
								<NotFound
									user={user}
									users={users}
									getTimeLabel={getTimeLabel}
								/>
							)
						}
					/>
				</Routes>
			</Suspense>
		</React.Fragment>
	);
};

export default SidebarPages;
