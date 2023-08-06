import React from "react";
import "./RequestsTable.css";
import { DataGrid } from "@mui/x-data-grid";
import { Badge } from "@mui/material";

const RequestsTable = ({ requests }) => {
	const columns = [
		{
			field: "id",
			headerName: "ID",
			width: 100,
			sortable: true,
			renderCell: (params) => {
				return (
					<React.Fragment>
						{params.row.status === "pending" && (
							<Badge
								badgeContent="Accept"
								color="primary"
								anchorOrigin={{
									vertical: "top",
									horizontal: "center",
								}}
							></Badge>
						)}
						{params.row.id}
					</React.Fragment>
				);
			},
		},
		{ field: "subject", headerName: "Subject", width: 200, sortable: true },
		{ field: "senderName", headerName: "Sender", width: 200, sortable: true },
		{ field: "urgency", headerName: "Urgency", width: 150, sortable: true },
		{ field: "status", headerName: "Status", width: 130, sortable: true },
		{ field: "amount", headerName: "Amount (KSh)", width: 130, sortable: true },
	];

	const rows =
		requests?.map((request, index) => ({
			id: request._id || index + 1,
			subject: request.subject,
			senderName: request.username,
			urgency: request.urgency,
			status: request.status,
			amount:
				request.status === "settled"
					? request.amount
					: request.status === "accepted"
					? request.amountQuoted
					: request.status === "rejected"
					? "Rejected"
					: "Not Accepted",
		})) || [];

	return (
		<div style={{ height: 600, width: "100%" }}>
			<DataGrid
				rows={rows}
				columns={columns}
				checkboxSelection
				disableSelectionOnClick
				sortingOrder={["asc", "desc", null]}
			/>
		</div>
	);
};

export default RequestsTable;
