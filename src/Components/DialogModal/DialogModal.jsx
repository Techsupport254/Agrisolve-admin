import React, { useEffect, useState } from "react";
import "./DialogModal.css";
import axios from "axios";
import { TextField, InputAdornment } from "@mui/material";
import { useHistory } from "react-router-use-history";

const DialogModal = ({
	sender,
	selectedRequest,
	user,
	handleClose,
	setSelectedRequest,
}) => {
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [successMessage, setSuccessMessage] = useState("");
	const [error, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [token, setToken] = useState(null);
	const history = useHistory();
	const [quotedAmount, setQuotedAmount] = useState(null);

	// get quoted amount
	useEffect(() => {
		setQuotedAmount(selectedRequest?.amountQuoted);
	}, [selectedRequest?.amountQuoted]);

	const handleQuote = async () => {
		setLoading(true);
		try {
			const response = await axios.patch(
				`http://localhost:8000/consults/consults/${selectedRequest._id}`,
				{
					status: "quoted",
					amountQuoted: quotedAmount,
				},
				{
					headers: {
						"x-auth-token": token, // Replace 'token' with the actual token
					},
				}
			);

			if (response.status === 200) {
				setSuccess(true);
				setSuccessMessage("Request quoted");
				setLoading(false);

				setTimeout(() => {
					setSuccess(false);
					setSuccessMessage("");
				}, 3000);

				// reload the page
				window.location.reload();
			}
		} catch (error) {
			setError(true);
			setErrorMessage("Error quoting request");
			setTimeout(() => {
				setError(false);
				setErrorMessage("");
			}, 3000);
			console.error("Error quoting request", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="DialogModal">
			<div className="Header">
				<h3>Quote service charges</h3>
			</div>
			<div className="Note">
				<p>NOTE: Please quote the amount you will charge for your service.</p>
			</div>
			<div className="RequestSummary">
				<div className="SummaryRow">
					<span>Subject</span>
					<p>{selectedRequest?.subject}</p>
				</div>
				<div className="SummaryRow">
					<span>Description</span>
					<p>{selectedRequest?.consultDescription}</p>
				</div>
				<div className="SummaryRow">
					<span>Customer</span>
					<p>{sender?.name}</p>
				</div>
				<div
					className="SummaryRow"
					style={{
						marginBottom: "1rem",
					}}
				>
					<span>Consultant</span>
					<p>{user?.name}</p>
				</div>
			</div>
			<div className="SummaryRow">
				<TextField
					label="Quote"
					variant="outlined"
					size="small"
					fullWidth
					color="success"
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<p>KSh.</p>
							</InputAdornment>
						),
					}}
					value={quotedAmount || ""}
					onChange={(e) => {
						setQuotedAmount(e.target.value);
					}}
				/>
			</div>
			{error && (
				<div className="Error">
					<p>{errorMessage}</p>
				</div>
			)}
			{success && (
				<div className="Success">
					<p>{successMessage}</p>
				</div>
			)}
			<div className="ApproveBtn">
				<button className="Approve" onClick={handleQuote}>
					{loading ? <i className="fa fa-spinner fa-spin"></i> : "Quote"}
				</button>
			</div>
		</div>
	);
};

export default DialogModal;
