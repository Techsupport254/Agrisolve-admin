// Time label function
export const getTimeLabel = (time) => {
	const timeDiffInMilliseconds = Date.now() - new Date(time).getTime();
	const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
	const oneHourInMilliseconds = 60 * 60 * 1000;
	const oneMinuteInMilliseconds = 60 * 1000;

	if (timeDiffInMilliseconds < oneMinuteInMilliseconds) {
		return `${Math.floor(timeDiffInMilliseconds / 1000)} secs ago`;
	} else if (timeDiffInMilliseconds < oneHourInMilliseconds) {
		return `${Math.floor(
			timeDiffInMilliseconds / oneMinuteInMilliseconds
		)} mins ago`;
	} else if (timeDiffInMilliseconds < oneDayInMilliseconds) {
		return `${Math.floor(
			timeDiffInMilliseconds / oneHourInMilliseconds
		)} hours ago`;
	} else if (timeDiffInMilliseconds < 2 * oneDayInMilliseconds) {
		return "Yesterday";
	} else {
		return new Date(time).toLocaleString("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
		});
	}
};
