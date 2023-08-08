import React from "react";
import "./Billing.css";
import BillingPlan from "../BillingPlan/BillingPlan";
import { invoiceData } from "../../Data";

const Billing = ({ user, getTimeLabel }) => {
	return (
		<div className="Billing">
			<div className="BillingLeft">
				<div className="Header">
					<h1>Plan</h1>
				</div>
				<BillingPlan user={user} />
			</div>
			<div className="BillingRight">
				<div className="Header">
					<i className="fas fa-file-invoice"></i>
					<h1>Invoice History</h1>
				</div>
				<div className="InvoiceHistory">
					{invoiceData.map((invoice) => (
						<div className="InvoiceRow" key={invoice.id}>
							<div className="InvoiceRowItem">
								<h1>{invoice?.title}</h1>
								<p>{getTimeLabel(invoice.date)}</p>
							</div>
							<div className="InvoiceAmount">
								<h1>${invoice.amount}</h1>
							</div>
							<div className="InvoiceDownload">
								<button className="btn btn-success">PDF</button>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Billing;
