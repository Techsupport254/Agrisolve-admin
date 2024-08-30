import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, CircularProgress } from "@mui/material";
import Logo from "../../assets/logo.png";
import "./VerifyEmail.css";

// Custom function to decode JWT tokens
const decodeJWT = (token) => {
	try {
		const base64Url = token.split(".")[1];
		const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
		const jsonPayload = decodeURIComponent(
			atob(base64)
				.split("")
				.map((c) => `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`)
				.join("")
		);
		return JSON.parse(jsonPayload);
	} catch (error) {
		console.error("Failed to decode JWT:", error);
		return null;
	}
};

const VerifyEmail = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const queryParams = new URLSearchParams(location.search);
	const code = queryParams.get("code");
	const [verificationStatus, setVerificationStatus] = useState("verifying");

	useEffect(() => {
		if (code) {
			checkIfVerified();
		} else {
			setVerificationStatus("error");
		}
	}, [code]);

	// Function to check if the user is already verified
	const checkIfVerified = async () => {
		try {
			const token = localStorage.getItem("token");
			if (!token) {
				setVerificationStatus("error");
				return;
			}

			const decodedToken = decodeJWT(token);
			if (decodedToken && decodedToken.exp > Date.now() / 1000) {
				// Check if already verified
				if (decodedToken.verificationStatus === "verified") {
					setVerificationStatus("success");
				} else {
					verifyEmail();
				}
			} else {
				setVerificationStatus("error");
			}
		} catch (error) {
			console.error("Error checking verification status:", error);
			setVerificationStatus("error");
		}
	};

	// Function to verify the email with the given code
	const verifyEmail = async () => {
		try {
			const token = localStorage.getItem("token");
			if (!token) {
				setVerificationStatus("error");
				return;
			}

			const response = await axios.get(
				`http://localhost:8000/auth/verify?code=${code}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (response.status === 200) {
				setVerificationStatus("success");
			} else {
				setVerificationStatus("error");
			}
		} catch (error) {
			console.error("Error verifying email:", error);
			setVerificationStatus("error");
		}
	};

	return (
		<div className="VerifyEmail FlexDisplay">
			<div className="VerificationCont FlexDisplay">
				<div className="VerificationLogo FlexDisplay">
					<img src={Logo} alt="logo" />
					<span>
						Agri<span>solve</span>
					</span>
				</div>
				{verificationStatus === "verifying" ? (
					<div className="Verifying FlexDisplay">
						<CircularProgress color="inherit" />
						<h3>Verifying Email...</h3>
					</div>
				) : verificationStatus === "success" ? (
					<div className="VerificationSuccess FlexDisplay">
						<h3>Email Verified Successfully</h3>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							x="0px"
							y="0px"
							width="100"
							height="100"
							viewBox="0 0 256 256"
						>
							<g fill="none" stroke="none" strokeWidth="1">
								<g transform="scale(4,4)">
									<path
										d="M30.413,40c-0.53,0-1.039-0.211-1.414-0.586l-6.517-6.517c-0.781-0.781-0.781-2.047,0-2.828c0.781-0.781,2.047-0.781,2.828,0l5.103,5.103l9.121-9.121c0.781-0.781,2.047-0.781,2.828,0c0.781,0.781,0.781,2.047,0,2.828l-10.535,10.535c-0.375,0.375-0.884,0.586-1.414,0.586z"
										fill="var(--success-dark)"
									></path>
									<path
										d="M32,54c-12.131,0-22-9.869-22-22c0-12.131,9.869-22,22-22c12.131,0,22,9.869,22,22c0,12.131-9.869,22-22,22zM32,14c-9.925,0-18,8.075-18,18c0,9.925,8.075,18,18,18c9.925,0,18-8.075,18-18c0-9.925-8.075-18-18-18z"
										fill="var(--success-dark)"
									></path>
								</g>
							</g>
						</svg>
						<p>
							Your email has been verified. You can now continue using the
							platform.
						</p>
						<Button
							variant="contained"
							color="primary"
							onClick={() => navigate("/")}
							style={{
								backgroundColor: "var(--success-dark)",
								"&:hover": {
									backgroundColor: "var(--success-darker)",
								},
							}}
						>
							Continue
						</Button>
					</div>
				) : (
					<div className="VerificationError FlexDisplay">
						<h3>Email Verification Failed</h3>
						<p>
							There was a problem verifying your email. The verification link
							may have expired or is invalid. Please contact support or try
							again.
						</p>
						<Button
							variant="contained"
							onClick={() => navigate(0)}
							style={{
								backgroundColor: "var(--bg-color)",
							}}
						>
							Retry
						</Button>
					</div>
				)}
			</div>
		</div>
	);
};

export default VerifyEmail;
