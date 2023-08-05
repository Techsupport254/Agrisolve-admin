import React, { useState } from "react";
import "./LoginPopup.css";

const LoginPopup = ({ loginURL, onLogin }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);

	const handleLogin = async (e) => {
		e.preventDefault();
		// Perform login action with the email and password
		try {
			const response = await fetch(loginURL, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }),
			});
			const userData = await response.json();
			if (response.ok && userData.loginStatus === "loggedIn") {
				onLogin(userData); // Trigger the onLogin function with the user data
			} else {
				setError("Invalid email or password"); // Set the error state if login fails
			}
		} catch (error) {
			console.error("Error during login", error);
			setError("An error occurred during login"); // Set the error state if an error occurs during login
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
						<button type="submit" className="LoginBtn1">
							Login
						</button>
						<button className="LoginBtn2">Cancel</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default LoginPopup;
