import React, { useState, useEffect } from "react";
import "./UsersTable.css";
import { Avatar, Badge } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const UsersTable = ({ users, getTimeLabel }) => {
	const [selectedUsers, setSelectedUsers] = useState([]);
	const [orderBy, setOrderBy] = useState("created_at");
	const [order, setOrder] = useState("desc");
	const [userTypeFilter, setUserTypeFilter] = useState("all");
	const [sortedUsers, setSortedUsers] = useState([]);

	useEffect(() => {
		const sortedData = [...users].sort((a, b) => {
			return new Date(b.created_at) - new Date(a.created_at);
		});
		setSortedUsers(sortedData);
	}, [users]);
	const handleSelectAllClick = (event) => {
		if (event.target.checked) {
			const selectedIds = sortedUsers.map((user) => user._id);
			setSelectedUsers(selectedIds);
		} else {
			setSelectedUsers([]);
		}
	};

	const handleSelectClick = (event, id) => {
		const selectedIndex = selectedUsers.indexOf(id);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selectedUsers, id);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selectedUsers.slice(1));
		} else if (selectedIndex === selectedUsers.length - 1) {
			newSelected = newSelected.concat(selectedUsers.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selectedUsers.slice(0, selectedIndex),
				selectedUsers.slice(selectedIndex + 1)
			);
		}

		setSelectedUsers(newSelected);
		console.log(selectedUsers);
	};

	const handleSortRequest = (property) => {
		const isAsc = orderBy === property && order === "asc";
		setOrderBy(property);
		setOrder(isAsc ? "desc" : "asc");
	};

	const handleUserTypeFilterChange = (event) => {
		setUserTypeFilter(event.target.value);
	};

	const filteredUsers = sortedUsers.filter((user) => {
		if (userTypeFilter === "all") return true;
		return user.userType === userTypeFilter;
	});

	const sortedAndFilteredUsers = filteredUsers.sort((a, b) => {
		if (orderBy === "username") {
			return (a.name > b.name ? 1 : -1) * (order === "asc" ? 1 : -1);
		}
		return (a[orderBy] > b[orderBy] ? 1 : -1) * (order === "asc" ? 1 : -1);
	});
	// Columns for DataGrid
	const columns = [
		{
			field: "username",
			headerName: "User",
			width: 200,
			sortable: true,
			renderCell: (params) => (
				<div
					style={{
						display: "flex",
						justifyContent: "flex-start",
						alignItems: "center",
						alignItems: "center",
					}}
				>
					<div className="Avatar">
						<Avatar
							src={
								params.row.profile
									? params.row.profile
									: "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
							}
							sx={{ width: 40, height: 40, marginRight: 1 }}
							alt="Profile"
						/>
						{/* online badge */}
						{params.row.loggedIn && (
							<Badge
								badgeContent=" "
								color="success"
								overlap="circular"
								variant="dot"
								sx={{
									position: "absolute",
									marginLeft: 4.4,
									marginTop: -1,
									border: "1px solid #fff",
									backgroundColor: "#fff",
									// animation
									animation: "pulse 1s infinite",

									"@keyframes pulse": {
										"0%": {
											transform: "scale(1)",
										},
										"50%": {
											transform: "scale(1.2)",
										},
										"100%": {
											transform: "scale(1)",
										},
									},
								}}
							/>
						)}
					</div>
					<div className="UserName">
						<span>{params.row.username}</span>
						<p>{params.row.name}</p>
					</div>
					{params.row.hasBadge && (
						<Badge
							badgeContent="New"
							color="primary"
							overlap="circular"
							sx={{ marginLeft: 2.5 }}
						/>
					)}
				</div>
			),
		},
		{
			field: "email",
			headerName: "Contacts",
			width: 250,
			sortable: true,
			renderCell: (params) => (
				<div
					style={{
						display: "flex",
						justifyContent: "flex-start",
						alignItems: "center",
					}}
				>
					<div className="Email">
						<span
							style={{
								color: "#3f51b5",
								fontWeight: "bold",
								fontSize: 12,
								cursor: "pointer",
								transition: "all 0.3s ease",

								"&:hover": {
									color: "#f50057",
								},
							}}
							// onclick
							onClick={() => window.open(`mailto:${params.row.email}`)}
						>
							{params.row.email}
						</span>
						<p
							style={{
								color: "#757575",
								fontSize: 12,
								cursor: "pointer",
							}}
							onClick={() => window.open(`tel:${params.row.phone}`)}
						>
							{params.row.phone}
						</p>
					</div>
				</div>
			),
		},
		{
			field: "userType",
			headerName: "User Type",
			width: 140,
			sortable: true,
			// style
			renderCell: (params) => (
				<div
					style={{
						textTransform: "capitalize",
						borderRadius: 5,
						padding: 5,
					}}
				>
					{params.row.userType}
				</div>
			),
		},
		{
			field: "created_at",
			headerName: "Joined",
			width: 120,
			sortable: true,
		},
		{
			field: "Payment",
			headerName: "Payment",
			width: 130,
			sortable: true,
			renderCell: (params) => (
				<div
					style={{
						textTransform: "capitalize",
						borderRadius: 5,
						padding: 5,
						color:
							params.row.Payment === "unpaid"
								? "#f44336"
								: params.row.Payment === "pending"
								? "#ff9800"
								: "#4caf50",
						backgroundColor: "#f5f5f5",
					}}
				>
					{params.row.Payment}
				</div>
			),
		},
		{
			field: "actions",
			headerName: "Actions",
			width: 100,
			sortable: false,
			renderCell: (params) => (
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<button>
						<i className="fas fa-edit"></i>
					</button>
					&nbsp; &nbsp; &nbsp;
					<button>
						<i className="fas fa-trash"></i>
					</button>
				</div>
			),
		},
	];

	// Rows for DataGrid
	const rows = sortedAndFilteredUsers.map((user) => ({
		id: user._id,
		username: user.username,
		profile: user.profilePicture,
		name: user.name,
		email: user.email,
		userType: user.userType,
		created_at: user.created_at ? getTimeLabel(user.created_at) : "N/A",
		Payment: user.paymentStatus,
		hasBadge: user.newUser === true,
		loggedIn: user.loginStatus === "loggedIn",
		phone: user.phone,
	}));

	return (
		<div style={{ height: 600, width: "100%" }}>
			<DataGrid
				rows={rows}
				columns={columns}
				checkboxSelection
				onSelectionModelChange={(newSelection) =>
					setSelectedUsers(newSelection.selectionModel)
				}
			/>
		</div>
	);
};

export default UsersTable;
