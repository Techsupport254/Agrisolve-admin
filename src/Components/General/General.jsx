import React, { useState } from "react";
import "./General.css";
import TextField from "@mui/material/TextField";
import Switch from "@mui/material/Switch";
import axios from "axios";

const General = ({ user }) => {
	const [uploading, setUploading] = useState(false);
	const [edit, setEdit] = useState(false);

	const [verificationStatus, setVerificationStatus] = useState(
		user?.verificationStatus === "verified"
	);

	const capitalize = (str) => {
		if (typeof str !== "string") return "";
		return str.charAt(0).toUpperCase() + str.slice(1);
	};

	const handleVerificationToggle = () => {
		setVerificationStatus(!verificationStatus);
	};

	const handleBrowseClick = () => {
		// Trigger the hidden input element's click event
		const fileInput = document.getElementById("file-input");
		if (fileInput) {
			fileInput.click();
		}
	};

	const handleFileInputChange = async (event) => {
		const file = event.target.files[0];
		const CLOUD_NAME = __CLOUD_NAME__;
		const PRESET_NAME = __UPLOAD_PRESET__;
		setUploading(true);

		try {
			const formData = new FormData();
			formData.append("file", file);
			formData.append("upload_preset", PRESET_NAME);

			const uploadResponse = await axios.post(
				`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
				formData
			);

			console.log("Upload Response:", uploadResponse.data);

			const updateResponse = await axios.patch(
				`https://agrisolve-techsupport254.vercel.app/auth/user/${user.email}`,
				{
					profilePicture: uploadResponse.data.secure_url,
				},
				{
					headers: {
						"x-auth-token": user.token,
					},
				}
			);

			console.log("Update Response:", updateResponse.data);

			setUploading(false);
		} catch (err) {
			console.error("Error:", err);
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
							<img src={user?.profilePicture} alt="ProfilePhoto" />
						</div>
					</div>
				) : (
					<div className="ProfilePhoto">
						<img src={user?.profilePicture} alt="ProfilePhoto" />
						<div className="UpdatePhoto" onClick={handleBrowseClick}>
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
							<label htmlFor="verificationStatus">
								<span>
									{user?.verificationStatus === "verified"
										? "Verified"
										: "Verify"}
								</span>
								<Switch
									id="verificationStatus"
									checked={verificationStatus}
									onChange={handleVerificationToggle}
									inputProps={{ "aria-label": "controlled" }}
									color="success"
								/>
							</label>
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
							value={user?.name}
							size="small"
							color="success"
							hover="success"
							sx={{
								"& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
									{
										borderColor: "primary",
									},

								"& .MuiInputLabel-outlined.Mui-focused": {
									color: "primary",
								},
							}}
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
							value={user?.username}
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
							value={user?.email}
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
							value={user?.phone}
							size="small"
							color="success"
							InputLabelProps={{
								shrink: true,
							}}
							disabled={!edit}
						/>
					</div>
				</div>
				<div className="GeneralRow">
					<div className="GeneralRowItem">
						<TextField
							id="Location"
							label="Location"
							variant="outlined"
							fullWidth
							value={user?.location}
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
							id="City"
							label="City"
							variant="outlined"
							fullWidth
							value={user?.location}
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
							value={user?.businessName}
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
							value={capitalize(user?.businessType)}
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
							value={user?.businessDescription}
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
					{edit ? (
						<button onClick={handleEdit}>
							<i className="fa fa-save"></i>
							<h1>Save Changes</h1>
						</button>
					) : (
						<button onClick={handleEdit}>
							<i className="fa fa-edit"></i>
							<h1>Edit</h1>
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default General;
