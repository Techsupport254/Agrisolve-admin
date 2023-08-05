import React from "react";
import "./UserCards.css";
import UserCard from "../UserCard/UserCard";

const UserCards = ({ newUser, users }) => {
	const categories = [
		{ name: "All", value: "all" },
		{ name: "Agriprofessional", value: "agriprofessional" },
		{ name: "Agribusiness", value: "agribusiness" },
	];

	return (
		<div className="UserCardsContainer">
			{categories.map((category, index) => (
				<div
					key={index}
					className="UserCard"
					style={{
						background:
							category.value === "all"
								? "linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%)"
								: category.value === "agriprofessional"
								? "linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)"
								: "linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%)",
					}}
				>
					<h3>{category.name}</h3>
					<UserCard
						users={
							category.value === "all"
								? users
								: users.filter((user) => user.userType === category.value)
						}
						category={category.name}
						all={users}
					/>
				</div>
			))}
		</div>
	);
};

export default UserCards;
