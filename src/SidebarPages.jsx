import React, { lazy, Suspense, useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import PropTypes from "prop-types";

// Lazy-loaded components
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
const Orders = lazy(() => import("./Pages/Orders/Orders"));
const Order = lazy(() => import("./Pages/Order/Order"));

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
	setChats,
	messages,
	orders,
	getCustomer,
	getProduct,
	earnings,
}) => {
	const [loading, setLoading] = useState(true);
	const [admin, setAdmin] = useState(false);
	const [agriprofessional, setAgriprofessional] = useState(false);
	const [agribusiness, setAgribusiness] = useState(false);
	const admin_email = __ADMIN__;
	console.log(user?.email, admin_email);
	// Check if user is admin
	useEffect(() => {
		if (user?.email === admin_email) {
			setAdmin(true);
		}
	}, [user?.email, admin_email]);

	useEffect(() => {
		setLoading(false);
	}, []);

	// Check if user is not agriprofessional
	useEffect(() => {
		if (user?.userType === "agriprofessional" && !admin) {
			setAgriprofessional(true);
		}
	}, [user?.userType]);

	// Check if user is not agribusiness
	useEffect(() => {
		if (user?.userType === "agribusiness" && !admin) {
			setAgribusiness(true);
		}
	}, [user?.userType]);

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
									users={users}
									products={products}
									getTimeLabel={getTimeLabel}
									requests={requests}
									chats={chats}
									messages={messages}
									orders={orders}
									getCustomer={getCustomer}
									getProduct={getProduct}
									earnings={earnings}
								/>
							)
						}
					/>
					{user?.email === admin_email && (
						<Route
							path="/users"
							element={
								loading ? (
									<LoadingFallback />
								) : (
									<Users
										user={user}
										users={users}
										getTimeLabel={getTimeLabel}
									/>
								)
							}
						/>
					)}
					{(admin || agribusiness) && (
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
										orders={orders}
										getCustomer={getCustomer}
										getProduct={getProduct}
										earnings={earnings}
									/>
								)
							}
						/>
					)}
					<Route
						path="/reports"
						element={
							loading ? (
								<LoadingFallback />
							) : (
								<Reports
									user={user}
									getTimeLabel={getTimeLabel}
									products={products}
								/>
							)
						}
					/>
					{(agriprofessional || admin) && (
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
					)}
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
									earnings={earnings}
								/>
							)
						}
					/>
					{(agriprofessional || admin) && (
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
										setChats={setChats}
									/>
								)
							}
						/>
					)}
					{(agriprofessional || admin) && (
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
										setChats={setChats}
									/>
								)
							}
						/>
					)}
					{(agribusiness || admin) && (
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
					)}
					{(agribusiness || admin) && (
						<Route
							path="orders/:id"
							element={
								loading ? (
									<LoadingFallback />
								) : (
									<Order
										user={user}
										users={users}
										getTimeLabel={getTimeLabel}
										products={products}
									/>
								)
							}
						/>
					)}
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
					{/* unauthorized*/}
					<Route
						path="unauthorized"
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

// props validation

SidebarPages.propTypes = {
	user: PropTypes.object,
	users: PropTypes.array,
	products: PropTypes.array,
	getTimeLabel: PropTypes.func,
	requests: PropTypes.array,
	chats: PropTypes.array,
	messages: PropTypes.array,
	orders: PropTypes.array,
	getCustomer: PropTypes.func,
	getProduct: PropTypes.func,
	earnings: PropTypes.array,
};
