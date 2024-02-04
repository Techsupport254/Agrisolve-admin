import React, { useState, useRef } from "react";
import { useTable } from "react-table";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Avatar,
	Button,
	Box,
	Typography,
} from "@mui/material";
import { Modal } from "antd";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	bgcolor: "background.paper",
	boxShadow: 24,
	p: 4,
};

const UsersTable = ({ users, getTimeLabel }) => {
	const [open, setOpen] = useState(false);
	const [selectedUser, setSelectedUser] = useState(null);
	const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
	const tableRef = useRef(null);

	const handleOpen = (user, event) => {
		const tableRect = tableRef.current.getBoundingClientRect();
		const buttonRect = event.currentTarget.getBoundingClientRect();
		setSelectedUser(user);
		setModalPosition({
			top: buttonRect.top - tableRect.top + buttonRect.height / 2,
			left: buttonRect.left - tableRect.left + buttonRect.width / 2,
		});
		setOpen(true);
	};

	const handleClose = () => setOpen(false);

	const data = React.useMemo(
		() =>
			users.map((user) => ({
				...user,
				created_at: user.created_at ? getTimeLabel(user.created_at) : "N/A",
			})),
		[users, getTimeLabel]
	);

	const columns = React.useMemo(
		() => [
			{
				Header: "User",
				accessor: "username",
				Cell: ({ row }) => (
					<div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
						<Avatar
							src={row.original.profilePicture}
							alt={row.original.username}
						/>
						<div className="UserProfileName">
							<span
								style={{
									fontSize: "13px",
									fontWeight: "600",
								}}
							>
								{row.original.username}
							</span>
							<p
								style={{
									color: "var(--p-color)",
									fontSize: "12px",
								}}
							>
								{row.original.name}
							</p>
						</div>
					</div>
				),
			},
			{
				Header: "Email",
				accessor: "email",
				Cell: ({ row }) => (
					<div className="UserProfileName">
						<span
							style={{
								fontSize: "13px",
							}}
						>
							{row.original.email}
						</span>
						<p
							style={{
								fontSize: "13px",
								color: "var(--primary)",
							}}
						>
							{row.original.phone}
						</p>
					</div>
				),
			},
			{
				Header: "User Type",
				accessor: "userType",
			},
			{
				Header: "Joined",
				accessor: "created_at",
			},
			{
				Header: "Message",
				Cell: () => (
					<Button
						variant="contained"
						color="primary"
						size="small"
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							fontSize: "10px",
						}}
					>
						Message
					</Button>
				),
			},
			{
				Header: "Action",
				accessor: "actions",
				Cell: ({ row }) => (
					<Button onClick={(e) => handleOpen(row.original, e)}>
						<i className="fas fa-ellipsis-vertical"></i>
					</Button>
				),
			},
		],
		[]
	);

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		useTable({ columns, data });

	return (
		<>
			<TableContainer component={Paper} ref={tableRef}>
				<Table
					{...getTableProps()}
					aria-label="simple table"
					style={{
						overflow: "hidden",
					}}
				>
					<TableHead
						style={{
							backgroundColor: "var(--bg-color)",
							overflow: "hidden",
						}}
					>
						{headerGroups.map((headerGroup) => (
							<TableRow
								{...headerGroup.getHeaderGroupProps()}
								style={{
									overflow: "hidden",
								}}
							>
								{headerGroup.headers.map((column) => (
									<TableCell
										style={{
											fontSize: "13px",
											fontWeight: "600",
											color: "var(--white)",
											padding: "5px",
										}}
										{...column.getHeaderProps()}
									>
										{column.render("Header")}
									</TableCell>
								))}
							</TableRow>
						))}
					</TableHead>
					<TableBody {...getTableBodyProps()}>
						{rows.map((row, i) => {
							prepareRow(row);
							return (
								<TableRow {...row.getRowProps()}>
									{row.cells.map((cell) => {
										return (
											<TableCell
												{...cell.getCellProps()}
												style={{
													fontSize: "13px",
													padding: "7px",
												}}
											>
												{cell.render("Cell")}
											</TableCell>
										);
									})}
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
};

export default UsersTable;
