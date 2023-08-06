import React, { useState } from "react";
import "./Login.css";

const LoginPopup = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);
	const [loading, setLoading] = useState(false);

	const handleLogin = async (e) => {
		e.preventDefault();

		// Validate the form
		if (!email || !password) {
			setError("Please fill in all the fields");
			return;
		}

		// Set loading to true
		setLoading(true);

		try {
			const response = await fetch(
				"https://agrisolve-techsupport254.vercel.app/auth/login",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ email, password }),
				}
			);

			if (response.ok) {
				const data = await response.json();

				// User logged in successfully
				setError(null);
				setSuccess("Login successful");

				// save the user data in local storage
				localStorage.setItem("agrisolveData", JSON.stringify(data));

				// Update login status in the database
				await fetch(
					`https://agrisolve-techsupport254.vercel.app/auth/user/${email}`,
					{
						method: "PATCH",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ loginStatus: "loggedIn" }),
					}
				);

				// Set loading to false after 3 seconds
				setTimeout(() => {
					setLoading(false);
					// Redirect to the home page after 3 seconds
					window.location.href = "/";
				}, 1000);
			} else {
				// Error logging in
				const data = await response.json();
				setError(data.message);
				setLoading(false);
			}
		} catch (error) {
			console.error("Error fetching data", error);
			setError("An error occurred during login");
			setLoading(false);
		}
	};

	return (
		<div className="LoginPopup">
			<div className="LoginContainer">
				<div className="LoginLeft bg-gray-200">
					<h3>Hi, Welcome Back</h3>
					<img
						src="https://minimals.cc/assets/illustrations/illustration_dashboard.png"
						alt="Login"
					/>
				</div>
				<div className="LoginRight bg-white">
					<h3>Login To Agrisolve</h3>
					<div className="NewUser">
						<p>New User?</p>
						<a href="/signup">Create an account</a>
					</div>
					<div className="Notification">
						{error ? (
							<>
								<i className="fas fa-exclamation-circle ErrorMessage"></i>
								<p className="ErrorMessage">{error}</p>
							</>
						) : success ? (
							<>
								<i className="fas fa-check-circle SuccessMessage"></i>
								<p className="SuccessMessage">{success}</p>
							</>
						) : (
							<>
								<i className="fas fa-info-circle InfoMessage"></i>
								<p>Please login to continue</p>
							</>
						)}
					</div>
					<form onSubmit={handleLogin}>
						<div className="input-container LoginInput">
							<input
								type="email"
								placeholder="Enter your email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
							<i className="fas fa-envelope"></i>
						</div>
						<div className="input-container LoginInput">
							<input
								type="password"
								placeholder="Enter your password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
							<i className="fas fa-lock"></i>
						</div>
						<div className="Forgot">
							<a href="/forgot">Forgot Password?</a>
						</div>
						<div className="LoginBtn">
							<button type="submit" disabled={loading}>
								{loading ? <i className="fas fa-spinner fa-spin"></i> : "Login"}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default LoginPopup;
