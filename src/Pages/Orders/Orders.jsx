import { useState, useEffect, useCallback } from "react";
import { Table, Tag, Button } from "antd";
import { DownOutlined, RightOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-use-history";
import PropTypes from "prop-types";
import "./Orders.css";
import { InputAdornment, TextField } from "@mui/material";
import nochat from "../../assets/nochat.png";

const Orders = ({ user, users, getTimeLabel, orders }) => {
	const [loading, setLoading] = useState(true);
	const [expandedKeys, setExpandedKeys] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [paymentFilter, setPaymentFilter] = useState("All");
	const [statusFilter, setStatusFilter] = useState("All");
	const history = useHistory();

	const adminEmail = __ADMIN__;

	const isAdmin = user?.email === adminEmail;

	useEffect(() => {
		if (orders.length > 0) {
			setLoading(false);
		}
	}, [orders]);

	const handleRowClick = (record) => {
		const newExpandedKeys = [...expandedKeys];
		const index = newExpandedKeys.indexOf(record._id);
		if (index > -1) {
			newExpandedKeys.splice(index, 1);
		} else {
			newExpandedKeys.push(record._id);
		}
		setExpandedKeys(newExpandedKeys);
	};

	const getCustomer = (userId) => {
		const customer = users.find((user) => user._id === userId);
		return customer || { name: "Unknown", email: "No email provided" };
	};

	const filteredOrders = orders.filter((order) => {
		const customer = getCustomer(order.userId);
		const matchesSearchTerm =
			order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
			customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			customer.email.toLowerCase().includes(searchTerm.toLowerCase());

		const matchesPaymentFilter =
			paymentFilter === "All" || order.payment.status === paymentFilter;

		const matchesStatusFilter =
			statusFilter === "All" ||
			order.timeline[order.timeline.length - 1].type === statusFilter;

		return matchesSearchTerm && matchesPaymentFilter && matchesStatusFilter;
	});

	// formatted price
	const formatPrice = (price) => {
		return price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	};

	const columns = [
		{
			title: "Order",
			dataIndex: "orderId",
			key: "orderId",
			render: (text, record) => (
				<a
					onClick={() => history.push(`/order/${record._id}`)}
					style={{
						color: "var(--primary-dark)",
						fontSize: "1rem",
						cursor: "pointer",
					}}
				>
					View
				</a>
			),
		},
		{
			title: "Customer",
			dataIndex: "userId",
			key: "customer",
			render: (userId) => {
				const customer = getCustomer(userId);
				return (
					<div className="Customer">
						<div className="Avatar">
							<img src={customer.profilePicture} alt="" className="avatar" />
						</div>
						<div className="CustomerDetails">
							<span>{customer.name}</span>
							<p>{customer.email}</p>
						</div>
					</div>
				);
			},
		},
		{
			title: "Products",
			dataIndex: "products",
			key: "products",
			render: (products) => (
				<div className="image-container">
					{products.slice(0, 3).map((product, index) => (
						<img
							key={product.productId._id}
							src={product.productId.images?.[0] || "https://picsum.photos/200"}
							alt={product.productId.productName || product.title}
							className="circular-image"
							style={{ zIndex: 10 - index }}
						/>
					))}
					{products.length > 3 && (
						<div className="more-images">+{products.length - 3}</div>
					)}
				</div>
			),
		},
		{
			title: "Amount (ksh)",
			dataIndex: "amounts",
			key: "total",
			render: (amounts, order) => (
				<>
					{isAdmin
						? formatPrice(amounts?.totalAmount)
						: formatPrice(
								order?.products?.reduce(
									(acc, product) => acc + product.price * product.quantity,
									0
								)
						  )}
				</>
			),
		},
		{
			title: isAdmin ? "Delivery (ksh)" : null,
			dataIndex: "amounts",
			key: "total",
			render: (amounts) => (
				<>{isAdmin ? formatPrice(amounts?.deliveryFee) : null}</>
			),
		},
		{
			title: "Fees (ksh)",
			dataIndex: "amounts",
			key: "total",
			render: (amounts, order) => {
				const tax = Number(amounts?.tax || 0);
				const discounts = Number(amounts?.discounts || 0);

				// Calculate product discounts for each product in the order
				const productDiscounts =
					order?.products?.reduce((acc, product) => {
						const productDiscountsSum = product?.productId?.discounts?.reduce(
							(discountAcc, discount) =>
								discountAcc + (discount.discountAmount || 0),
							0
						);
						return acc + (productDiscountsSum || 0);
					}, 0) || 0;

				const totalFees = isAdmin ? tax + discounts : productDiscounts;
				return <>{formatPrice(totalFees)}</>;
			},
		},

		{
			title: "Total (ksh)",
			dataIndex: "amounts",
			key: "total",
			render: (amounts) => <>{formatPrice(amounts?.totalAmount)}</>,
		},
		{
			title: "Payment",
			dataIndex: "payment",
			key: "payment",
			render: (payment) => (
				<p
					style={{
						backgroundColor:
							payment.status === "Pending"
								? "var(--warning-dark)"
								: payment.status === "Paid"
								? "var(--success-dark)"
								: "var(--error-dark)",
						color: "#fff",
					}}
				>
					{payment.status}
				</p>
			),
		},
		{
			title: "Date",
			dataIndex: "date",
			key: "date",
			render: (date) => getTimeLabel(date),
		},
		{
			title: "Status",
			dataIndex: "timeline",
			key: "status",
			render: (timeline) => {
				const latestTimeline = timeline[timeline.length - 1];
				const c = "#fff";

				const bg =
					latestTimeline.type === "Pending"
						? "var(--warning-dark)"
						: latestTimeline.type === "Confirmed"
						? "var(--primary-dark)"
						: latestTimeline.type === "Delivered"
						? "var(--success-dark)"
						: "var(--info-dark)";

				return (
					<Tag color={c} style={{ backgroundColor: bg }}>
						{latestTimeline.type}
					</Tag>
				);
			},
		},
	];

	const expandedRowRender = (order) => {
		const productColumns = [
			{
				title: "Product Name",
				dataIndex: "productName",
				key: "productName",
				render: (text, product) => (
					<div className="Customer">
						<div className="ProductImage">
							<img
								src={
									product.productId?.images?.[0]
										? product.productId.images[0]
										: "https://picsum.photos/200"
								}
								alt={product.productId?.productName || "Product Image"}
							/>
						</div>
						<div className="CustomerDetails">
							<span>{product.productId?.productName || text}</span>
							<h3>
								{product.productId?.productCategory} |{" "}
								{product.productId?.subCategory}
							</h3>
							<p>{product.productId?.brandName}</p>
						</div>
					</div>
				),
			},
			{
				title: "Images",
				dataIndex: "image",
				key: "image",
				render: (text, product) => (
					<div className="image-container">
						{product.productId?.images?.slice(0, 3).map((imgSrc, index) => (
							<img
								key={index}
								src={imgSrc || "https://picsum.photos/200"}
								alt={product.productId?.productName || product.title}
								className="circular-image"
							/>
						))}
						{product.productId?.images?.length > 3 && (
							<div className="more-images">
								+{product.productId?.images?.length - 3}
							</div>
						)}
					</div>
				),
			},
			{
				title: "Qty",
				dataIndex: "quantity",
				key: "quantity",
			},
			{
				title: "Price",
				dataIndex: "price",
				key: "price",
				render: (text, product) => `ksh. ${formatPrice(product.price)}`,
			},
			{
				title: "Total",
				dataIndex: "total",
				key: "total",
				render: (text, product) => {
					const productDetails = product.productId || {};
					return `ksh. ${formatPrice(productDetails.price * product.quantity)}`;
				},
			},
			{
				title: "Owner",
				dataIndex: "owner",
				key: "owner",
				// find the owner of the product by refId
				render: (text, product) => {
					const owner = users.find((user) => user._id === product.refId);
					return owner ? owner.username : "Unknown";
				},
			},
		];

		return (
			<Table
				columns={productColumns}
				dataSource={order.products}
				pagination={false}
				rowKey="productId"
			/>
		);
	};

	const handleClearFilters = useCallback(() => {
		setSearchTerm("");
		setPaymentFilter("All");
		setStatusFilter("All");
	}, []);

	return (
		<div className="Orders">
			<div className="Header">
				<i className="fa fa-shopping-cart"></i>
				<h3>Orders</h3>
			</div>
			<div className="Stepper">
				<div className="Lists">
					<li>Dashboard</li>
					<li>Orders</li>
					<li>Lists</li>
				</div>
				<div className="TableTop">
					<TextField
						size="small"
						placeholder="Search for order or customer"
						color="success"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<i
										className="fa fa-search"
										style={{
											fontSize: "1.2rem",
											cursor: "pointer",
										}}
									></i>
								</InputAdornment>
							),
						}}
					/>
					<TextField
						size="small"
						color="success"
						select
						value={paymentFilter}
						onChange={(e) => setPaymentFilter(e.target.value)}
						SelectProps={{
							native: true,
						}}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<p className="Payment">Payment</p>
								</InputAdornment>
							),
						}}
					>
						<option value="All">All</option>
						<option value="Pending">Pending</option>
						<option value="Paid">Paid</option>
					</TextField>
					<TextField
						size="small"
						color="success"
						select
						value={statusFilter}
						onChange={(e) => setStatusFilter(e.target.value)}
						SelectProps={{
							native: true,
						}}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<p className="Payment">Status</p>
								</InputAdornment>
							),
						}}
					>
						<option value="All">All</option>
						<option value="Pending">Pending</option>
						<option value="Confirmed">Confirmed</option>
						<option value="OnWay">On the way</option>
						<option value="Delivered">Delivered</option>
					</TextField>
					<button
						style={{
							color: "var(--warning-dark)",
							fontSize: "1rem",
							padding: "4px 8px",
							background: "none",
							cursor: "pointer",
						}}
						onClick={handleClearFilters}
					>
						Clear &nbsp;
						<i className="fa fa-filter"></i>
					</button>
				</div>
			</div>
			<div className="OrdersContainer">
				{!orders || orders.length === 0 ? (
					<div className="NoOrder">
						<img src={nochat} alt="" />
						<h3>No orders yet</h3>
					</div>
				) : (
					<Table
						columns={columns}
						expandable={{
							expandedRowRender,
							rowExpandable: () => true,
							expandedRowKeys: expandedKeys,
							onExpand: (expanded, record) => {
								handleRowClick(record);
							},
						}}
						dataSource={filteredOrders}
						rowKey="_id"
						loading={loading}
						onRow={(record) => ({
							onClick: () => handleRowClick(record),
						})}
						className="ParentTable"
					/>
				)}
			</div>
		</div>
	);
};

Orders.propTypes = {
	users: PropTypes.array.isRequired,
	getTimeLabel: PropTypes.func.isRequired,
	orders: PropTypes.array.isRequired,
};

export default Orders;
