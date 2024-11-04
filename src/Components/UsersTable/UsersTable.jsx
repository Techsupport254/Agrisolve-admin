import React, { useState } from "react";
import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TablePagination,
	Button,
	Popover,
	Box,
	Typography,
	List,
	ListItem,
	ListItemText,
	Avatar,
} from "@mui/material";
import PropTypes from "prop-types";
import { useTable } from "react-table";
import "./UsersTable.css";
import UserPopOver from "../UserPopOver/UserPopOver";

const UsersTable = ({ users, getTimeLabel }) => {
	const [anchorEl, setAnchorEl] = useState(null);
	const [selectedUser, setSelectedUser] = useState(null);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	const handleOpenPopover = (user, event) => {
		setSelectedUser(user);
		setAnchorEl(event.currentTarget);
	};

	const handleClosePopover = () => {
		setAnchorEl(null);
		setSelectedUser(null);
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

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
					<Box display="flex" alignItems="center" gap="10px">
						<Avatar
							src={row.original.profilePicture}
							alt={row.original.username}
							sx={{ width: 40, height: 40 }}
						/>
						<Box>
							<Typography variant="subtitle2" fontWeight="600">
								{row.original.username}
							</Typography>
							<Typography variant="body2" color="textSecondary">
								{row.original.name}
							</Typography>
						</Box>
					</Box>
				),
			},
			{
				Header: "Email",
				accessor: "email",
				Cell: ({ row }) => (
					<Box>
						<Typography variant="body2">{row.original.email}</Typography>
						<Typography variant="body2" color="primary">
							{row.original.phone}
						</Typography>
					</Box>
				),
			},
			{
				Header: "User Type",
				accessor: "userType",
				Cell: ({ value }) => (
					<Typography
						variant="body2"
						sx={{
							padding: "1px 5px",
							backgroundColor:
								value === "agribusiness"
									? "var(--success-dark)"
									: value === "agriprofessional"
									? "var(--info-dark)"
									: "var(--warning-dark)",
							color: "white",
							borderRadius: "10px",
							display: "inline-block",
							fontSize: ".8rem",
						}}
					>
						{value.charAt(0).toUpperCase() + value.slice(1)}
					</Typography>
				),
			},
			{
				Header: "Joined",
				accessor: "created_at",
			},
			{
				Header: "Status",
				accessor: "status",
				Cell: ({ value }) => (
					<Typography
						variant="body2"
						sx={{
							padding: "1px 5px",
							backgroundColor:
								value === "active"
									? "var(--success-dark)"
									: value === "suspended"
									? "var(--warning-dark)"
									: "var(--error-dark)",
							color: "white",
							borderRadius: "10px",
							display: "inline-block",
							fontSize: ".8rem",
						}}
					>
						{value.charAt(0).toUpperCase() + value.slice(1)}
					</Typography>
				),
			},
			{
				Header: "Action",
				accessor: "actions",
				Cell: ({ row }) => (
					<Button
						onClick={(e) => handleOpenPopover(row.original, e)}
						variant="text"
						size="small"
					>
						<i className="fas fa-ellipsis-vertical"></i>
					</Button>
				),
			},
		],
		[]
	);

	const { getTableProps, getTableBodyProps, rows, prepareRow } = useTable({
		columns,
		data,
	});

	return (
		<div className="UsersTableContainer">
			<Paper>
				<TableContainer>
					<Table {...getTableProps()} stickyHeader>
						<TableHead className="UsersTableHeader">
							<TableRow className="UsersTableHeader">
								<TableCell>Profile</TableCell>
								<TableCell>User</TableCell>
								<TableCell>User Type</TableCell>
								<TableCell>Joined</TableCell>
								<TableCell>Action</TableCell>
							</TableRow>
						</TableHead>
						<TableBody {...getTableBodyProps()}>
							{rows
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((row) => {
									prepareRow(row);
									return (
										<TableRow
											{...row.getRowProps()}
											key={row.id}
											sx={{
												"&:hover": {
													backgroundColor: "action.hover",
												},
											}}
										>
											{row.cells.map((cell) => (
												<TableCell
													{...cell.getCellProps()}
													key={cell.column.id}
													sx={{
														fontSize: "13px",
														padding: "8px",
													}}
												>
													{cell.render("Cell")}
												</TableCell>
											))}
										</TableRow>
									);
								})}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[5, 10, 25, 100]}
					component="div"
					count={rows.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
				<Popover
					open={Boolean(anchorEl)}
					anchorEl={anchorEl}
					onClose={handleClosePopover}
					anchorOrigin={{
						vertical: "bottom",
						horizontal: "left",
					}}
					transformOrigin={{
						vertical: "top",
						horizontal: "left",
					}}
				>
					<UserPopOver user={selectedUser} />
				</Popover>
			</Paper>
		</div>
	);
};

UsersTable.propTypes = {
	users: PropTypes.array.isRequired,
	getTimeLabel: PropTypes.func.isRequired,
};

export default UsersTable;
