import React, { useEffect, useState } from "react";
import "./RequestsTable.css";
import { DataGrid } from "@mui/x-data-grid";
import { Badge, Modal } from "@mui/material";
import RequestModal from "../RequestModal/RequestModal";
import { useHistory } from "react-router-use-history";

const RequestsTable = ({ requests, users, getTimeLabel, user }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedRequest, setSelectedRequest] = useState(null);
	const [selectedSender, setSelectedSender] = useState(null);
	const history = useHistory();

	const handleModalOpen = () => {
		setIsModalOpen(true);
	};

	const handleModalClose = () => {
		setIsModalOpen(false);
	};

	const fetchSender = (senderId) => {
		const sender = users.find((user) => user._id === senderId);
		return sender;
	};

	useEffect(() => {
		if (selectedRequest) {
			const sender = fetchSender(selectedRequest.senderId);
			setSelectedSender(sender);
		}
	}, [selectedRequest, users]);

	// sort by the latest request
	const sortedRequests = requests?.sort((a, b) => {
		console.log("Sorting:", new Date(b.date), new Date(a.date));
		return new Date(b.date) - new Date(a.date);
	});

	const columns = [
		{
			field: "subject",
			headerName: "Subject",
			width: 200,
			sortable: true,
			renderCell: (params) => {
				return (
					<div className="ReqCol">
						<span>{params.row.subject}</span>
						<p>
							{params.row.status === "pending" ? (
								<Badge
									badgeContent="New"
									color="primary"
									anchorOrigin={{
										vertical: "top",
										horizontal: "left",
									}}
									sx={{
										marginLeft: "16px",
										marginRight: "30px",
										cursor: "pointer",
									}}
								/>
							) : params.row.status === "accepted" ? (
								<p style={{ color: "#4caf50" }}>Accepted</p>
							) : params.row.status === "rejected" ? (
								<p
									style={{
										color: "#f44336",
									}}
								>
									Rejected
								</p>
							) : (
								<p
									style={{
										color: "#3f51b5",
									}}
								>
									Settled
								</p>
							)}
						</p>
					</div>
				);
			},
		},
		{
			field: "senderName",
			headerName: "Sender",
			width: 200,
			sortable: true,
			renderCell: (params) => {
				return (
					<div className="ReqCol">
						<span>
							{params.row.senderName === user.username
								? "You"
								: params.row.senderName}
						</span>
						<p
							style={{
								color:
									params.row.urgency === "High"
										? "#f44336"
										: params.row.urgency === "Medium"
										? "#ff9800"
										: "#4caf50",
							}}
						>
							{params.row.urgency}
						</p>
					</div>
				);
			},
		},
		{
			field: "acceptedBy",
			headerName: "Accepted By",
			width: 200,
			renderCell: (params) => {
				return (
					<div>
						{params.row.status === "accepted" ? (
							<span>
								{params.row.acceptedBy === user.username
									? "You"
									: params.row.acceptedBy}
							</span>
						) : (
							<span>N/A</span>
						)}
					</div>
				);
			},
		},
		{
			field: "acceptedAt",
			headerName: "Accepted",
			width: 200,
			renderCell: (params) => {
				return (
					<div>
						{params.row.status === "accepted" ? (
							<span>{params.row.acceptedAt}</span>
						) : (
							<span>N/A</span>
						)}
					</div>
				);
			},
		},
		{ field: "amount", headerName: "Amount (KSh)", width: 130, sortable: true },
	];

	const rows =
		sortedRequests?.map((request, index) => ({
			id: request._id || index + 1,
			subject: request.subject,
			senderName: request.name,
			urgency: request.urgency,
			status: request.status,
			description: request.consultDescription,
			acceptedBy: request.acceptedBy,
			acceptedById: request.acceptedById,
			acceptedAt: request.acceptedAt
				? getTimeLabel(request.acceptedAt)
				: "Not Accepted",
			amount:
				request.status === "settled"
					? request.amount
					: request.status === "accepted"
					? request.amountQuoted
					: request.status === "rejected"
					? "Rejected"
					: "Not Accepted",
			senderId: request.refId,
			refId: request.refId,
		})) || [];

	const handleRowClick = (params) => {
		const selectedSender = fetchSender(params.row.senderId);
		setSelectedRequest(params.row);
		setSelectedSender(selectedSender);
		handleModalOpen();

		if (
			params.row.status === "accepted" &&
			params.row.acceptedById === user._id
		)
			history.push({
				pathname: `/requests/${params.row.id}`,
				state: { selectedRequest: params.row },
			});
	};
	return (
		<div className="RequestsTable" style={{ height: 600 }}>
			<DataGrid
				rows={rows}
				columns={columns}
				disableSelectionOnClick
				sortingOrder={["asc", "desc", null]}
				onRowClick={handleRowClick}
			/>

			<Modal open={isModalOpen} onClose={handleModalClose}>
				<RequestModal
					selectedRequest={selectedRequest}
					selectedSender={selectedSender}
					handleModalClose={handleModalClose}
					user={user}
					setSelectedRequest={setSelectedRequest}
					setSelectedSender={setSelectedSender}
				/>
			</Modal>
		</div>
	);
};

export default RequestsTable;
