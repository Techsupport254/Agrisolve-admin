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
			field: "id",
			headerName: "ID",
			width: 200,
			sortable: true,
			renderCell: (params) => {
				return (
					<div>
						{params.row.status === "pending" && (
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
						)}
						{params.row.id}
					</div>
				);
			},
		},
		{ field: "subject", headerName: "Subject", width: 200, sortable: true },
		{ field: "senderName", headerName: "Sender", width: 200, sortable: true },
		{ field: "urgency", headerName: "Urgency", width: 150, sortable: true },
		{ field: "status", headerName: "Status", width: 130, sortable: true },
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
							<span>___</span>
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
							<span>___</span>
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
			senderName: request.username,
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

		// navigate to /requests/:id
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
		<div style={{ height: 600, width: "100%" }}>
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
