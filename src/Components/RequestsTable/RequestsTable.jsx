import React, { useState, useEffect } from "react";
import "./RequestsTable.css";
import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TablePagination,
	Modal,
	Button,
} from "@mui/material";
import RequestModal from "../RequestModal/RequestModal";

const columns = [
	{
		field: "subject",
		headerName: "Subject",
		sortable: true,
	},
	{
		field: "senderName",
		headerName: "Sender",
		sortable: false,
	},
	{
		field: "urgency",
		headerName: "Urgency",
		sortable: false,
	},
	{
		field: "status",
		headerName: "Status",
		sortable: true,
	},
	{
		field: "acceptedBy",
		headerName: "Accepted By",
		sortable: false,
	},
	{
		field: "acceptedAt",
		headerName: "Accepted",
		sortable: false,
	},
	{
		field: "amount",
		headerName: "Amount (KSh)",
		sortable: false,
	},
	{
		field: "action",
		headerName: "Action",
		sortable: false,
	},
];

function StickyHeadTable({ getTimeLabel, requests, users, user }) {
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);
	const [isModal, setIsModal] = useState(false);
	const [selectedRequest, setSelectedRequest] = useState(null);
	const [selectedSender, setSelectedSender] = useState(null);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	const handleModal = () => {
		setIsModal(!isModal);
	};

	const fetchSender = (senderId) => {
		const sender = users.find((user) => user._id === senderId);
		return sender;
	};

	const handleRowClick = (request) => {
		setSelectedRequest(request);
		handleModal();
	};

	useEffect(() => {
		if (selectedRequest) {
			const sender = fetchSender(selectedRequest.refId);
			setSelectedSender(sender);
			console.log(selectedRequest);
			console.log(sender);
		}
	}, [selectedRequest, users]);

	return (
		<Paper
			sx={{
				width: "79vw",
				height: "100%",
				overflow: "auto",
				fontSize: "13px",
				border: "1px solid var(--p-color)",
			}}
		>
			<TableContainer
				sx={{
					width: "100%",
					height: "93%",
					overflow: "hidden",
				}}
			>
				<Table stickyHeader aria-label="sticky table">
					<TableHead>
						<TableRow>
							{columns.map((column) => (
								<TableCell
									key={column.field}
									align="left"
									style={{
										padding: ".2rem",
										background: "var(--bg-color)",
										color: "var(--white)",
										fontSize: ".8rem",
									}}
								>
									{column.headerName}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{requests
							?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((request) => (
								<TableRow
									key={request._id}
									onClick={() => handleRowClick(request)}
								>
									{columns.map((column) => (
										<TableCell
											key={column.field}
											align="left"
											style={{
												padding: ".4rem",
												fontSize: ".8rem",
												cursor: "pointer",
											}}
											onClick={() => handleRowClick(request)}
										>
											{column.field === "status" && (
												<div className="RequestStatus">
													{request.status === "pending" && (
														<span style={{ color: "var(--primary)" }}>New</span>
													)}
													{request.status === "accepted" && (
														<span style={{ color: "#4caf50" }}>Accepted</span>
													)}
													{request.status === "rejected" && (
														<span style={{ color: "#f44336" }}>Rejected</span>
													)}
													{request.status === "settled" && (
														<span style={{ color: "#3f51b5" }}>Settled</span>
													)}
												</div>
											)}
											{column.field === "senderName" && (
												<span>{request.name}</span>
											)}
											{column.field === "acceptedBy" && (
												<span>
													{request.status === "accepted"
														? request.acceptedBy
														: "N/A"}
												</span>
											)}
											{column.field === "acceptedAt" && (
												<span>
													{request.status === "accepted"
														? getTimeLabel(request.acceptedAt)
														: "N/A"}
												</span>
											)}
											{column.field === "amount" && (
												<span>
													{request.status === "settled"
														? request.amount
														: request.status === "accepted"
														? request.amountQuoted
														: request.status === "rejected"
														? "Rejected"
														: "Not Accepted"}
												</span>
											)}
											{column.field === "subject" && (
												<span>{request.subject}</span>
											)}
											{column.field === "urgency" && (
												<span
													style={{
														color:
															request.urgency === "High"
																? "#f44336"
																: request.urgency === "Medium"
																? "#ff9800"
																: "#4caf50",
													}}
												>
													{request.urgency}
												</span>
											)}
											{column.field === "action" && (
												<Button
													variant="basic"
													onClick={() => {
														handleModal();
													}}
													style={{
														fontSize: ".7rem",
													}}
												>
													<i className="fa-solid fa-ellipsis-vertical"></i>
												</Button>
											)}
										</TableCell>
									))}
								</TableRow>
							))}
					</TableBody>
				</Table>
			</TableContainer>

			<TablePagination
				rowsPerPageOptions={[10, 25, 100]}
				component="div"
				count={requests?.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
				style={{
					display: "flex",
					justifyContent: "flex-end",
					alignItems: "center",
					padding: "0",
					margin: "0",
					height: "2rem",
					border: "1px solid var(--p-color)",
				}}
			/>

			<Modal open={isModal}>
				<RequestModal
					selectedRequest={selectedRequest}
					selectedSender={selectedSender}
					handleModalClose={() => {
						handleModal();
						setSelectedRequest(null);
						setSelectedSender(null);
					}}
					user={user}
					setSelectedRequest={setSelectedRequest}
					setSelectedSender={setSelectedSender}
				/>
			</Modal>
		</Paper>
	);
}

export default StickyHeadTable;
