import React, { useState } from "react";
import "./LoginPopup.css";

const LoginPopup = ({ onLogin }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);
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
				onLogin(data);

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
				}, 3000);
			} else {
				// Error logging in
				const data = await response.json();
				setError(data.message);
				setLoading(false);
			}
		} catch (error) {
			console.error("Error logging in", error);
			setError("An error occurred during login");
			setLoading(false);
		}
	};

	return (
		<div className="LoginPopup">
			<div className="LoginContainer">
				<h3>Login To Agrisolve</h3>
				<form onSubmit={handleLogin}>
					{error && <p className="ErrorMessage">{error}</p>}
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
					<div className="LoginBtns">
						<button type="submit" className="LoginBtn1" disabled={loading}>
							{loading ? "Logging in..." : "Login"}
						</button>
						<button className="LoginBtn2">Cancel</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default LoginPopup;
