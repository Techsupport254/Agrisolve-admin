import React from "react";
import "./Requests.css";
import { requestsNavigations } from "../../Data";
import { Badge } from "@mui/material";
import RequestsTable from "../../Components/RequestsTable/RequestsTable";
import PropTypes from "prop-types";

const Requests = ({ requests, user, users, getTimeLabel }) => {
	const [active, setActive] = React.useState("all");
	const [searchQuery, setSearchQuery] = React.useState("");
	const [selectedCategory, setSelectedCategory] = React.useState("");

	// Filter requests based on active status
	const filterRequests = (status) => {
		let filteredRequests = requests;
		if (status === "new") {
			filteredRequests = requests.filter(
				(request) => request.newConsult === true
			);
		} else if (status === "accepted") {
			filteredRequests = requests.filter(
				(request) => request.acceptedById === user._id
			);
		} else if (status === "pending") {
			filteredRequests = requests.filter(
				(request) => request.status === "pending"
			);
		} else if (status === "approved") {
			filteredRequests = requests.filter(
				(request) => request.status === "accepted"
			);
		} else if (status === "rejected") {
			filteredRequests = requests.filter(
				(request) => request.status === "rejected"
			);
		}
		return filteredRequests;
	};

	// Combined filtering logic for active status, search query, and selected category
	const filteredRequests = filterRequests(active)
		.filter((request) => {
			// Apply the search query filter
			const requestName = request.subject || ""; // Assuming 'subject' is the name field to search
			return requestName.toLowerCase().includes(searchQuery.toLowerCase());
		})
		.filter((request) => {
			// Check if selected category matches the request's status
			if (!selectedCategory || selectedCategory === "all") return true;
			return request.status.toLowerCase() === selectedCategory;
		});

	const handleActive = (name) => {
		setActive(name);
		setSelectedCategory(""); // Reset category when changing active tab
	};

	const handleClearFilters = () => {
		setSearchQuery("");
		setActive("all");
		setSelectedCategory("");
	};

	return (
		<div className="Requests">
			<div className="RequestsTop">
				<div className="Header">
					<i className="fa fa-clipboard-list" />
					<h2>Requests</h2>
				</div>
				<div className="TopRequestsBtns">
					<div className="TopRequestsBtnsLeft">
						<input
							type="text"
							placeholder="Search for..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							style={{
								width: "180px",
								padding: "6px",
								fontSize: "1rem",
								border: "1px solid #ccc",
								borderRadius: "4px",
								marginRight: "10px",
							}}
						/>
						<select
							value={selectedCategory}
							onChange={(e) => setSelectedCategory(e.target.value)}
							style={{
								padding: "6px",
								fontSize: "1rem",
								border: "1px solid #ccc",
								borderRadius: "4px",
								minWidth: "140px",
							}}
						>
							<option value="">
								<em>All</em>
							</option>
							{requestsNavigations.map((nav) => (
								<option key={nav.name} value={nav.name.toLowerCase()}>
									{nav.name}
								</option>
							))}
						</select>
					</div>
					<div className="TopRequestsRight">
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
							Clear <i className="fa fa-filter"></i>
						</button>
					</div>
				</div>
			</div>
			<div className="RequestsTable">
				<RequestsTable
					requests={filteredRequests}
					users={users}
					getTimeLabel={getTimeLabel}
					user={user}
				/>
			</div>
		</div>
	);
};

export default Requests;

// props validation
Requests.propTypes = {
	requests: PropTypes.array.isRequired,
	user: PropTypes.object.isRequired,
	users: PropTypes.array.isRequired,
	getTimeLabel: PropTypes.func.isRequired,
};
