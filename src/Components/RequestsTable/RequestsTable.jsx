import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
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
	containerClasses,
} from "@mui/material";
import RequestModal from "../RequestModal/RequestModal";

const RequestsTable = ({ requests, users, user, getTimeLabel }) => {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedRequest, setSelectedRequest] = useState(null);
	const [selectedSender, setSelectedSender] = useState(null);

	const handleRowClick = (request) => {
		setSelectedRequest(request);
		const sender = fetchSender(request.refId);
		setSelectedSender(sender);
		setIsModalOpen(true);
	};

	const handleModalClose = () => {
		setIsModalOpen(false);
		setSelectedRequest(null);
		setSelectedSender(null);
	};

	const fetchSender = (senderId) => {
		return users.find((user) => user._id === senderId);
	};

	useEffect(() => {
		if (selectedRequest) {
			const sender = fetchSender(selectedRequest.refId);
			setSelectedSender(sender);
		}
	}, [selectedRequest]);

	return (
		<div className="RequestsTable">
			<div className="RequestsTableContainer">
				<Paper className="RequestsPaper">
					<TableContainer className="TableContainer">
						<Table stickyHeader aria-label="sticky table">
							<TableHead className="RequestsTableHeader">
								<TableRow className="RequestsTableHeader">
									<TableCell>Subject</TableCell>
									<TableCell>Sender</TableCell>
									<TableCell>Urgency</TableCell>
									<TableCell>Posted</TableCell>
									<TableCell>Status</TableCell>
									<TableCell>Accepted By</TableCell>
									<TableCell>Accepted At</TableCell>
									<TableCell>Amount (KSh)</TableCell>
								</TableRow>
							</TableHead>
							{requests?.length === 0 && (
								<TableBody>
									<TableRow>
										<TableCell colSpan={8} style={{ textAlign: "center" }}>
											No requests available
										</TableCell>
									</TableRow>
								</TableBody>
							)}
							<TableBody>
								{requests
									.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
									.map((request) => (
										<TableRow
											key={request?._id}
											onClick={() => handleRowClick(request)}
											style={{ cursor: "pointer" }}
										>
											<TableCell>{request?.subject}</TableCell>
											<TableCell>{request?.name}</TableCell>
											<TableCell>
												<span
													style={{
														background:
															request?.urgency === "High"
																? "var(--error-dark)"
																: request?.urgency === "Medium"
																? "var(--warning-dark)"
																: "var(--success-dark)",
														padding: "2px 4px",
														borderRadius: "4px",
														color: "#fff",
													}}
												>
													{request?.urgency}
												</span>
											</TableCell>
											<TableCell>{getTimeLabel(request?.date)}</TableCell>
											<TableCell>
												<div className="RequestStatus">
													{request?.status === "pending" && (
														<span style={{ color: "var(--primary)" }}>New</span>
													)}
													{request?.status === "accepted" && (
														<span style={{ color: "#4caf50" }}>Accepted</span>
													)}
													{request?.status === "rejected" && (
														<span style={{ color: "#f44336" }}>Rejected</span>
													)}
													{request?.status === "settled" && (
														<span style={{ color: "#3f51b5" }}>Settled</span>
													)}
												</div>
											</TableCell>
											<TableCell>
												{request?.status === "accepted"
													? request?.acceptedBy
													: "N/A"}
											</TableCell>
											<TableCell>
												{request?.status === "accepted"
													? getTimeLabel(request?.acceptedAt)
													: "N/A"}
											</TableCell>
											<TableCell>
												{request?.status === "settled"
													? request?.amount
													: request?.status === "accepted"
													? request?.amountQuoted
													: request?.status === "rejected"
													? "Rejected"
													: "Not Accepted"}
											</TableCell>
										</TableRow>
									))}
							</TableBody>
						</Table>
					</TableContainer>
					<TablePagination
						rowsPerPageOptions={[5, 10, 25, 100]}
						component="div"
						count={requests?.length || 0}
						rowsPerPage={rowsPerPage}
						page={page}
						onPageChange={(event, newPage) => setPage(newPage)}
						onRowsPerPageChange={(event) => {
							setRowsPerPage(parseInt(event.target.value, 10));
							setPage(0);
						}}
					/>
				</Paper>
			</div>
			{selectedRequest && (
				<Modal open={isModalOpen} onClose={handleModalClose}>
					<RequestModal
						selectedRequest={selectedRequest}
						selectedSender={selectedSender}
						handleModalClose={handleModalClose}
						user={user}
					/>
				</Modal>
			)}
		</div>
	);
};

RequestsTable.propTypes = {
	requests: PropTypes.array.isRequired,
	users: PropTypes.array.isRequired,
	user: PropTypes.object.isRequired,
	getTimeLabel: PropTypes.func.isRequired,
};

export default RequestsTable;
