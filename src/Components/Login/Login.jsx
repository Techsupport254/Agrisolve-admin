import React, { useState } from "react";
import "./Login.css";
import logo from "../../assets/logo.png";

const LoginPopup = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);
	const [loading, setLoading] = useState(false);

	// Handle login submission
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
			// Send login request
			const response = await fetch("http://localhost:8000/auth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }),
			});

			// Handle successful login
			if (response.ok) {
				const data = await response.json();

				// Clear error and set success message
				setError(null);
				setSuccess("Login successful");

				// Save user data in local storage
				localStorage.setItem("agrisolveData", JSON.stringify(data));

				// Update login status in the database
				await updateUserLoginStatus(email);

				// Redirect to the home page after 1 second
				setTimeout(() => {
					setLoading(false);
					window.location.href = "/";
				}, 1000);
			} else {
				// Handle login error
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

	// Update user login status
	const updateUserLoginStatus = async (email) => {
		try {
			await fetch(`http://localhost:8000/auth/users/${email}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ loginStatus: "loggedIn" }),
			});
		} catch (error) {
			console.error("Error updating login status", error);
		}
	};

	const storedUser = JSON.parse(localStorage.getItem("agrisolveData"));
	console.log(storedUser);

	return (
		<div className="LoginPopup">
			<div className="LoginContainer">
				<div className="LoginLeft bg-gray-200">
					<h3>Hi, Welcome Back</h3>
					<img src={logo} alt="Login" />
				</div>
				<div className="LoginRight bg-white">
					<h3>Login To Agrisolve</h3>
					<div className="NewUser">
						<p>New User?</p>
						<a href="/signup">Create an account</a>
					</div>
					<div className="Notification">
						{error && (
							<div className="ErrorMessage">
								<i className="fas fa-exclamation-circle"></i>
								<p>{error}</p>
							</div>
						)}
						{success && (
							<div className="SuccessMessage">
								<i className="fas fa-check-circle"></i>
								<p>{success}</p>
							</div>
						)}
						{!error && !success && (
							<div className="InfoMessage">
								<i className="fas fa-info-circle"></i>
								<p>Please login to continue</p>
							</div>
						)}
					</div>
					<form onSubmit={handleLogin}>
						<div className="input-container LoginInput">
							<input
								type="email"
								placeholder="Enter your email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								aria-label="Email"
								required
							/>
							<i className="fas fa-envelope"></i>
						</div>
						<div className="input-container LoginInput">
							<input
								type="password"
								placeholder="Enter your password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								aria-label="Password"
								required
							/>
							<i className="fas fa-lock"></i>
						</div>
						<div className="Forgot">
							<a href="/forgot">Forgot Password?</a>
						</div>
						<div className="LoginBtn">
							<button type="submit" disabled={loading} aria-busy={loading}>
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
