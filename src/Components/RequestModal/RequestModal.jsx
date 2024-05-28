import React, { forwardRef, useState } from "react";
import "./RequestModal.css";
import { TextField } from "@mui/material";
import axios from "axios";
import { useHistory } from "react-router-use-history";

const RequestModal = forwardRef(
	(
		{
			selectedRequest,
			selectedSender,
			handleModalClose,
			user,
			setSelectedRequest,
			setSelectedSender,
		},
		ref
	) => {
		const [loading, setLoading] = useState(false);
		const [token, setToken] = useState(null);
		const [requests, setRequests] = useState(null);
		const [success, setSuccess] = useState(false);
		const [successMessage, setSuccessMessage] = useState("Request accepted");
		const [error, setError] = useState(false);
		const [errorMessage, setErrorMessage] = useState("");
		const history = useHistory();

		console.log(selectedRequest);

		const handleAcceptRequest = async () => {
			try {
				setLoading(true);
				const response = await axios.patch(
					`https://agrisolve-techsupport254.vercel.app/consults/consults/${selectedRequest._id}`,
					{
						status: "accepted",
						acceptedBy: user.name,
						acceptedById: user._id,
						amountQuoted: 0,
					},
					{
						headers: {
							"x-auth-token": token,
						},
					}
				);

				if (response.status === 200) {
					// Update requests list only if it is not null
					if (requests) {
						const updatedRequests = requests.map((request) => {
							if (request.id === selectedRequest.id) {
								return {
									...request,
									status: "accepted",
									acceptedBy: user.name,
									acceptedById: user._id,
								};
							}
							return request;
						});
						setRequests(updatedRequests);
					}

					// Reset selectedRequest and selectedSender
					setSelectedRequest(null);
					setSelectedSender(null);

					// Close the modal after a brief delay
					setTimeout(() => {
						setLoading(false);
						setSuccess(true);
						setSuccessMessage("Request accepted");

						// Navigate to /requests after closing the modal
						history.push({
							pathname: `/requests/${selectedRequest._id}`,
							state: { selectedRequest, setSelectedRequest },
						});

						// Reload the window
						window.location.reload();
					}, 3000);
				}
			} catch (error) {
				setLoading(false);
				setError(true);
				setErrorMessage("Error accepting request");

				// Debugging: Log the error
				console.error("Error accepting request", error);

				// Hide error message after a brief delay
				setTimeout(() => {
					setError(false);
					setErrorMessage("");
				}, 3000);
			}
		};

		return (
			<div className="RequestModal" ref={ref}>
				<div className="ModalContainer">
					<div className="ModalContent bg-gray-100">
						<div className="ContentLeft">
							{selectedRequest && (
								<>
									<div className="Header">
										<h2>Request Details</h2>
									</div>
									<div className="RequestRow">
										<TextField
											label="Subject"
											outlined
											value={selectedRequest.subject}
											disabled
											size="small"
											fullWidth
										/>
										<TextField
											label="Farming Type"
											outlined
											value={selectedRequest.farmingType}
											disabled
											size="small"
											fullWidth
										/>
									</div>
									<div className="RequestRow">
										<TextField
											label="Mode"
											outlined
											value={selectedRequest.consultType}
											disabled
											size="small"
											fullWidth
										/>
										<TextField
											label="Urgency"
											outlined
											value={selectedRequest.urgency}
											disabled
											size="small"
											fullWidth
										/>
									</div>
									<div className="RequestRow">
										<TextField
											label="Status"
											outlined
											value={selectedRequest.status}
											disabled
											size="small"
											fullWidth
										/>
									</div>
									<div className="RequestRow">
										<TextField
											label="Description"
											outlined
											value={selectedRequest.consultDescription}
											disabled
											size="small"
											multiline
											rows={4}
											fullWidth
										/>
									</div>
								</>
							)}
						</div>

						<div className="ContentRight">
							<div className="SenderProfile">
								<div className="SenderImage">
									<img
										src={
											selectedSender?.profilePicture ||
											"https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
										}
										alt="Sender"
									/>
									{selectedSender?.loginStatus === "loggedIn" ? (
										<div className="Online"></div>
									) : (
										<div className="Offline"></div>
									)}
								</div>
								<div className="SenderDetails">
									<span>{selectedSender?.name}</span>
									<h2>{selectedSender?.username}</h2>
									<p>{selectedSender?.location}</p>
								</div>
								{success && (
									<div className="SuccessMessage">
										<p>{successMessage}</p>
									</div>
								)}
								{error && (
									<div className="ErrorMessage">
										<p>{errorMessage}</p>
									</div>
								)}
								<div className="ModalBtns">
									<button className="CloseBtn" onClick={handleModalClose}>
										Close
									</button>
									{selectedRequest?.status !== "accepted" && (
										<button onClick={handleAcceptRequest} className="AcceptBtn">
											{loading ? (
												<i className="fas fa-spinner fa-spin"></i>
											) : (
												"Accept"
											)}
										</button>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
);

export default RequestModal;
