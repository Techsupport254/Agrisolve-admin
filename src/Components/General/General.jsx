import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Switch, TextField, Snackbar, Alert, styled } from "@mui/material";
import "./General.css";

const IOSSwitch = styled((props) => (
	<Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
	width: 42,
	height: 26,
	padding: 0,
	"& .MuiSwitch-switchBase": {
		padding: 0,
		margin: 2,
		transitionDuration: "300ms",
		"&.Mui-checked": {
			transform: "translateX(16px)",
			color: "#fff",
			"& + .MuiSwitch-track": {
				backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
				opacity: 1,
				border: 0,
			},
		},
		"&.Mui-focusVisible .MuiSwitch-thumb": {
			color: "#33cf4d",
			border: "6px solid #fff",
		},
	},
	"& .MuiSwitch-thumb": {
		width: 22,
		height: 22,
	},
	"& .MuiSwitch-track": {
		borderRadius: 26 / 2,
		backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
		opacity: 1,
		transition: theme.transitions.create(["background-color"], {
			duration: 500,
		}),
	},
}));

const General = ({ user }) => {
	const [uploading, setUploading] = useState(false);
	const [edit, setEdit] = useState(false);
	const [responseMessage, setResponseMessage] = useState("");
	const [responseError, setResponseError] = useState("");

	const token = localStorage.getItem("token");

	const capitalize = (str) => {
		return typeof str === "string"
			? str.charAt(0).toUpperCase() + str.slice(1)
			: "";
	};

	const handleVerificationToggle = async () => {
		if (user.verificationStatus === "verified") {
			setResponseMessage("Your email is already verified.");
			return;
		}

		try {
			const response = await axios.get(
				`http://localhost:8000/auth/sendVerification`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			setResponseMessage(response.data.message);
		} catch (error) {
			console.error("Verification error:", error);
			setResponseError(error.response?.data?.error || "An error occurred.");
		}
	};

	const handleFileInputChange = async (event) => {
		const file = event.target.files[0];
		const CLOUD_NAME = process.env.REACT_APP_CLOUD_NAME;
		const PRESET_NAME = process.env.REACT_APP_UPLOAD_PRESET;
		setUploading(true);

		try {
			const formData = new FormData();
			formData.append("file", file);
			formData.append("upload_preset", PRESET_NAME);

			const uploadResponse = await axios.post(
				`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
				formData
			);

			await axios.patch(
				`http://localhost:8000/auth/user/${user.email}`,
				{
					profilePicture: uploadResponse.data.secure_url,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			setResponseMessage("Profile picture updated successfully!");
		} catch (err) {
			console.error("Error updating profile picture:", err);
			setResponseError("Failed to update profile picture.");
		} finally {
			setUploading(false);
		}
	};

	const handleEdit = () => {
		setEdit(!edit);
	};

	return (
		<div className="General">
			<div className="GeneralLeft">
				{uploading ? (
					<div className="Uploading">
						<div className="ProfilePhoto">
							<img src={user?.profilePicture} alt="Profile" />
						</div>
					</div>
				) : (
					<div className="ProfilePhoto">
						<img src={user?.profilePicture} alt="Profile" />
						<div
							className="UpdatePhoto"
							onClick={() => document.getElementById("file-input").click()}
						>
							<i className="fa fa-camera"></i>
							<h1>Update photo</h1>
						</div>
						<input
							type="file"
							id="file-input"
							hidden
							onChange={handleFileInputChange}
						/>
					</div>
				)}
				<div className="ProfileInfo">
					<div className="ProfileInfoItem">
						<h2>{user?.name}</h2>
						<span>{user?.username}</span>
						<p>{user?.userType}</p>
						<div className="Verified">
							<IOSSwitch
								id="verificationStatus"
								checked={user?.verificationStatus === "verified"}
								onChange={handleVerificationToggle}
							/>
							<span>
								{user?.verificationStatus === "verified"
									? "Verified"
									: "Verify"}
							</span>
						</div>
					</div>
				</div>
				<div className="DangerBtn">Delete Account</div>
			</div>
			<div className="GeneralRight">
				<div className="GeneralRow">
					<div className="GeneralRowItem">
						<TextField
							id="name"
							label="Full Name"
							variant="outlined"
							fullWidth
							value={user?.name || ""}
							size="small"
							color="success"
							disabled={!edit}
							InputLabelProps={{
								shrink: true,
							}}
						/>
					</div>
					<div className="GeneralRowItem">
						<TextField
							id="username"
							label="Username"
							variant="outlined"
							fullWidth
							value={user?.username || ""}
							size="small"
							color="success"
							disabled={!edit}
							InputLabelProps={{
								shrink: true,
							}}
						/>
					</div>
				</div>
				<div className="GeneralRow">
					<div className="GeneralRowItem">
						<TextField
							id="email"
							label="Email"
							variant="outlined"
							fullWidth
							value={user?.email || ""}
							size="small"
							color="success"
							disabled={!edit}
							InputLabelProps={{
								shrink: true,
							}}
						/>
					</div>
					<div className="GeneralRowItem">
						<TextField
							id="phone"
							label="Phone"
							variant="outlined"
							fullWidth
							value={user?.phone || ""}
							size="small"
							color="success"
							disabled={!edit}
							InputLabelProps={{
								shrink: true,
							}}
						/>
					</div>
				</div>
				<div className="GeneralRow">
					<div className="GeneralRowItem">
						<TextField
							id="location"
							label="Location"
							variant="outlined"
							fullWidth
							value={user?.location || ""}
							size="small"
							color="success"
							disabled={!edit}
							InputLabelProps={{
								shrink: true,
							}}
						/>
					</div>
					<div className="GeneralRowItem">
						<TextField
							id="city"
							label="City"
							variant="outlined"
							fullWidth
							value={user?.city || ""}
							size="small"
							color="success"
							disabled={!edit}
							InputLabelProps={{
								shrink: true,
							}}
						/>
					</div>
				</div>
				<div className="GeneralRow">
					<div className="GeneralRowItem">
						<TextField
							id="businessName"
							label="Business Name"
							variant="outlined"
							fullWidth
							value={user?.businessName || ""}
							size="small"
							color="success"
							disabled={!edit}
							InputLabelProps={{
								shrink: true,
							}}
						/>
					</div>
					<div className="GeneralRowItem">
						<TextField
							id="businessType"
							label="Business Type"
							variant="outlined"
							fullWidth
							value={capitalize(user?.businessType) || ""}
							size="small"
							color="success"
							disabled={!edit}
							InputLabelProps={{
								shrink: true,
							}}
						/>
					</div>
				</div>
				<div className="GeneralRow">
					<div className="GeneralRowItem">
						<TextField
							id="businessDescription"
							label="Business Description"
							variant="outlined"
							fullWidth
							value={user?.businessDescription || ""}
							color="success"
							multiline
							rows={4}
							disabled={!edit}
							InputLabelProps={{
								shrink: true,
							}}
						/>
					</div>
				</div>
				<div className="EditBtn">
					<button onClick={handleEdit}>
						<i className={`fa ${edit ? "fa-save" : "fa-edit"}`}></i>
						<h1>{edit ? "Save Changes" : "Edit"}</h1>
					</button>
				</div>
			</div>
			<Snackbar
				open={Boolean(responseMessage) || Boolean(responseError)}
				autoHideDuration={6000}
				onClose={() => {
					setResponseMessage("");
					setResponseError("");
				}}
			>
				<Alert
					severity={responseError ? "error" : "success"}
					onClose={() => {
						setResponseMessage("");
						setResponseError("");
					}}
				>
					{responseError || responseMessage}
				</Alert>
			</Snackbar>
		</div>
	);
};

export default General;

General.propTypes = {
	user: PropTypes.object.isRequired,
};
