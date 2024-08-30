import "./OrderRight.css";
import PropTypes from "prop-types";

const OrderRight = ({ order, getCustomer }) => {
	const delivery = [
		{
			label: "Ship By",
			value: "FedEx",
		},
		{
			label: "Type",
			value: `${order.shipping.method}`,
		},
		{
			label: "Tracking ID",
			value: `${order.shipping.trackingNumber}`,
		},
		{
			label: "Expected Delivery",
			value: `${new Date(order.shipping.estimatedDelivery)
				.toLocaleString("en-US", {
					year: "numeric",
					month: "short",
					day: "numeric",
				})
				.replace(",", "")}`,
		},
	];

	const shipping = [
		{
			label: "Street",
			value: `${order.shippingAddress.street}`,
		},
		{
			label: "City",
			value: `${order.shippingAddress.city}`,
		},
		{
			label: "State",
			value: `${order.shippingAddress.state}`,
		},
		{
			label: "Zip Code",
			value: `${order.shippingAddress.zipCode}`,
		},
	];

	const payment = [
		{
			label: "Method",
			value: `${order.payment.method}`,
		},
		{
			label: "Card Number",
			value: `${order.payment.number}`,
		},
		{
			label: "Card Holder",
			value: `${order.payment.holder}`,
		},
		{
			label: "Payment Date",
			value: `${new Date(order.payment.date).toLocaleString("en-US", {
				year: "numeric",
				month: "short",
				day: "numeric",
				hour: "numeric",
				minute: "numeric",
				hour12: true,
			})}`,
		},
		{
			label: "Payment Status",
			value: `${order.payment.status}`,
		},
	];

	const discounts = [
		{
			label: "Discount Code",
			value: `${
				order?.discounts && order.discounts.length > 0
					? order.discounts[0].code
					: "No Discount"
			}`,
		},
		{
			label: "Discount Amount",
			value: `${
				order?.discounts && order.discounts.length > 0
					? order.discounts[0].amount
					: "No Discount"
			}`,
		},
	];

	const tax = [
		{
			label: "Tax Amount",
			value: `${order.tax.amount}`,
		},
		{
			label: "Tax Rate",
			value: `${order.tax.rate}`,
		},
		{
			label: "Tax Status",
			value: `${order.tax.status}`,
		},
	];

	return (
		<div className="OrderRightCont">
			<div className="Header">
				<h3>Customer Info</h3>
			</div>
			<div className="CustomerHeader">
				<div className="Avatar">
					<img src={getCustomer(order?.userId)?.profilePicture} alt="" />
				</div>
				<div className="CustomerDetails">
					<span>{getCustomer(order?.userId)?.name}</span>
					<p>{getCustomer(order?.userId)?.email}</p>
					<small>{getCustomer(order?.userId)?.phone}</small>
				</div>
			</div>
			<div className="Delivery">
				<div className="Header">
					<h3>Delivery </h3>
				</div>
				<div className="DeliveryInfo">
					{delivery.map((item, index) => (
						<div className="DeliveryItem" key={index}>
							<span>{item.label}</span>
							<p>{item.value}</p>
						</div>
					))}
				</div>
			</div>
			<div className="Shipping">
				<div className="Header">
					<h3>Shipping </h3>
				</div>
				<div className="ShippingInfo">
					{shipping.map((item, index) => (
						<div className="ShippingItem" key={index}>
							<span>{item.label}</span>
							<p>{item.value}</p>
						</div>
					))}
				</div>
			</div>
			<div className="OrderPayment">
				<div className="Header">
					<h3>Payment </h3>
				</div>
				<div className="PaymentInfo">
					{payment.map((item, index) => (
						<div className="PaymentItem" key={index}>
							<span>{item.label}</span>
							<p>{item.value}</p>
						</div>
					))}
				</div>
			</div>
			<div className="OrderPayment">
				<div className="Header">
					<h3>Discounts </h3>
				</div>
				<div className="PaymentInfo">
					{discounts.map((item, index) => (
						<div className="PaymentItem" key={index}>
							<span>{item.label}</span>
							<p>{item.value}</p>
						</div>
					))}
				</div>
			</div>
			<div className="OrderPayment">
				<div className="Header">
					<h3>Tax </h3>
				</div>
				<div className="PaymentInfo">
					{tax.map((item, index) => (
						<div className="PaymentItem" key={index}>
							<span>{item.label}</span>
							<p>{item.value}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default OrderRight;

// validate props

OrderRight.propTypes = {
	order: PropTypes.object,
	getCustomer: PropTypes.func,
	getProduct: PropTypes.func,
};
