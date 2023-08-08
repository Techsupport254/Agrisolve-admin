import React from "react";
import "./NotFound.css";
import error from "../../assets/404.png";

const NotFound = () => {
	return (
		<div className="NotFound">
			<span>Sorry, Page Not Found!</span>
			<p>
				Sorry, the page you are looking for could not be found.
				<br />
				Please go back to the homepage and try again.
			</p>
			<div className="ErrorImage">
				<img src={error} alt="404" />
			</div>
			<div
				className="HomeBtn"
				onClick={() => {
					window.location.href = "/";
				}}
			>
				<button>Go Home</button>
			</div>
		</div>
	);
};

export default NotFound;
