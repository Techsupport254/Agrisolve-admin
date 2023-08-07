import React, { useState } from "react";
import "./General.css";
import TextField from "@mui/material/TextField";
import Switch from "@mui/material/Switch";

const General = ({ user }) => {
	const [verificationStatus, setVerificationStatus] = useState(
		user?.verificationStatus === "verified"
	);

	const capitalize = (str) => {
		if (typeof str !== "string") return "";
		return str.charAt(0).toUpperCase() + str.slice(1);
	};

	const handleVerificationToggle = () => {
		setVerificationStatus(!verificationStatus);
		// You can make API calls here to update the verification status
	};

	return (
		<div className="General">
			<div className="GeneralLeft">
				<div className="ProfilePhoto">
					<img src={user?.profilePicture} alt="ProfilePhoto" />
					<div className="UpdatePhoto">
						<i className="fa fa-camera"></i>
						<h1>Update photo</h1>
					</div>
				</div>
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
						/>
					</div>
				</div>
				<div className="EditBtn">
					<button>
						<i className="fa fa-edit"></i>
						<h1>Edit</h1>
					</button>
				</div>
			</div>
		</div>
	);
};

export default General;
