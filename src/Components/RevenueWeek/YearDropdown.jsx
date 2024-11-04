import React from "react";

const YearDropdown = ({ selectedYear, setSelectedYear }) => {
	return (
		<select
			className="year-selector"
			value={selectedYear}
			onChange={(e) => setSelectedYear(e.target.value)}
		>
			<option value="2023">2023</option>
			<option value="2022">2022</option>
		</select>
	);
};

export default YearDropdown;
