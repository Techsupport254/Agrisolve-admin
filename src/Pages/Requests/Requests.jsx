import React from "react";
import "./Requests.css";
import { requestsNavigations } from "../../Data";
import { Badge } from "@mui/material";
import RequestsTable from "../../Components/RequestsTable/RequestsTable";
import req from "../../assets/req.png";

const Requests = ({ requests, user }) => {
	const [active, setActive] = React.useState(
		requestsNavigations[0].name.toLowerCase()
	);

	const handleActive = (name) => {
		setActive(name);
	};

	let newRequests =
		requests?.filter((request) => request.newConsult === true) || [];
	let pendingRequests =
		requests?.filter((request) => request.status === "pending") || [];
	let approvedRequests =
		requests?.filter((request) => request.status === "accepted") || [];
	let rejectedRequests =
		requests?.filter((request) => request.status === "rejected") || [];

	// filter requests by active status
	const filterRequests = (status) => {
		if (status === "all") {
			return requests;
		} else if (status === "new") {
			return newRequests;
		} else if (status === "pending") {
			return pendingRequests;
		} else if (status === "approved") {
			return approvedRequests;
		} else if (status === "rejected") {
			return rejectedRequests;
		}
	};

	return (
		<div className="Requests">
			<div className="Header">
				<i className="fa fa-clipboard-list" />
				<h3>Requests</h3>
			</div>
			<div className="RequestTop">
				<div className="RequestsLeft">
					<div className="RequestTopText">
						<h3>Congratulations!</h3>
						<span>{user?.name}</span>
						<p>
							You have <span>{newRequests?.length}</span> requests. You can
							attend to them by clicking on the "Accept" badge.
						</p>
						{/* <button className="ExportBtn">Export</button> */}
					</div>
					<img src={req} alt="requests" className="RequestTopImg" />
				</div>
				<div className="RequestsRight">
					{requestsNavigations.map((nav, index) => {
						return (
							<div
								className={
									nav.name.toLowerCase() === active
										? "RequestTopItem RequestTopItemActive"
										: "RequestTopItem"
								}
								key={index}
								onClick={() => handleActive(nav.name.toLowerCase())}
							>
								<div
									className="RequestTopItemIcon"
									style={{ color: nav.color }}
								>
									{nav.icon}
								</div>
								<Badge
									badgeContent={
										nav.name === "New"
											? newRequests.length
											: nav.name === "Pending"
											? pendingRequests.length
											: nav.name === "Approved"
											? approvedRequests.length
											: 0
									}
									color={
										nav.name === "All"
											? "secondary"
											: nav.name === "New"
											? "primary"
											: nav.name === "Pending"
											? "warning"
											: nav.name === "Approved"
											? "success"
											: "error"
									}
									overlap="circular"
									anchorOrigin={{
										vertical: "top",
										horizontal: "right",
									}}
								>
									<div className="RequestTopItemTitle">{nav.name}</div>
								</Badge>
							</div>
						);
					})}
				</div>
			</div>
			<div className="RequestBottom">
				<RequestsTable requests={filterRequests(active)} />
			</div>
		</div>
	);
};

export default Requests;
