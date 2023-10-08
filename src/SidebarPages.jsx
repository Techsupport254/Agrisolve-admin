import React, { lazy, Suspense, useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Orders from "./Pages/Orders/Orders";

const Dashboard = lazy(() => import("./Pages/Dashboard/Dashboard"));
const Users = lazy(() => import("./Pages/Users/Users"));
const Products = lazy(() => import("./Pages/Products/Products"));
const Reports = lazy(() => import("./Pages/Reports/Reports"));
const Requests = lazy(() => import("./Pages/Requests/Requests"));
const Login = lazy(() => import("./Components/Login/Login"));
const NewProduct = lazy(() => import("./Components/NewProduct/NewProduct"));
const Chats = lazy(() => import("./Pages/Chats/Chats"));
const Finance = lazy(() => import("./Pages/Finance/Finance"));
const News = lazy(() => import("./Pages/News/News"));
const Accepted = lazy(() => import("./Components/Accepted/Accepted"));
const NotFound = lazy(() => import("./Components/404/NotFound"));
const Profile = lazy(() => import("./Pages/Profile/Profile"));

const LoadingFallback = () => (
	<div className="SpinnerLoading">
		<i className="fa fa-spinner fa-spin" />
	</div>
);

const SidebarPages = ({
	user,
	users,
	products,
	getTimeLabel,
	requests,
	chats,
}) => {
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
									users={users}
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
					<Route
						path="requests/:id"
						element={
							loading ? (
								<LoadingFallback />
							) : (
								<Accepted
									user={user}
									users={users}
									getTimeLabel={getTimeLabel}
									requests={requests}
									chats={chats}
								/>
							)
						}
					/>
					<Route
						path="news"
						element={
							loading ? (
								<LoadingFallback />
							) : (
								<News user={user} users={users} getTimeLabel={getTimeLabel} />
							)
						}
					/>
					<Route
						path="news/:id"
						element={
							loading ? (
								<LoadingFallback />
							) : (
								<News user={user} users={users} getTimeLabel={getTimeLabel} />
							)
						}
					/>
					{/* finance */}
					<Route
						path="finance"
						element={
							loading ? (
								<LoadingFallback />
							) : (
								<Finance
									user={user}
									users={users}
									getTimeLabel={getTimeLabel}
								/>
							)
						}
					/>
					<Route
						path="chats"
						element={
							loading ? (
								<LoadingFallback />
							) : (
								<Chats
									user={user}
									users={users}
									getTimeLabel={getTimeLabel}
									chats={chats}
								/>
							)
						}
					/>
					<Route
						path="chats/:id"
						element={
							loading ? (
								<LoadingFallback />
							) : (
								<Chats
									user={user}
									users={users}
									getTimeLabel={getTimeLabel}
									chats={chats}
								/>
							)
						}
					/>
					<Route
						path="orders"
						element={
							loading ? (
								<LoadingFallback />
							) : (
								<Orders
									user={user}
									users={users}
									getTimeLabel={getTimeLabel}
									products={products}
								/>
							)
						}
					/>
					<Route
						path="orders/:id"
						element={
							loading ? (
								<LoadingFallback />
							) : (
								<Orders user={user} users={users} getTimeLabel={getTimeLabel} />
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
