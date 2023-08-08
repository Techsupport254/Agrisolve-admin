import React, { useState } from "react";
import "./Security.css";
import { TextField, InputAdornment, IconButton } from "@mui/material";

const Security = ({ user }) => {
	return (
		<div className="Security">
			<TextField
				id="oldPassword"
				label="Old Password"
				color="success"
				variant="outlined"
				fullWidth
				type="password"
			/>
			<TextField
				id="newPassword"
				label="New Password"
				color="success"
				variant="outlined"
				fullWidth
				type="password"
				helperText="Must be at least 6 characters long"
			/>
			<TextField
				id="confirmPassword"
				label="Confirm Password"
				color="success"
				variant="outlined"
				fullWidth
				type="password"
			/>
			<div className="SecurityBtn">
				<button className="btn btn-success">Save Changes</button>
			</div>
		</div>
	);
};

export default Security;
