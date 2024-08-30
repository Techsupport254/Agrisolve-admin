import "./Finance.css";
import FinanceCards from "../../Components/FinanceCards/FinanceCards";
import Transactions from "../../Components/Transactions/Transactions";
import FinanceRight from "../../Components/FinanceRight/FinanceRight";
import PropTypes from "prop-types";

const Finance = ({ user, getTimelabel, earnings, users }) => {
	const formatNumberWithCommas = (number) => {
		return new Intl.NumberFormat().format(number);
	};

	// Ensure values are treated as numbers
	const balance = Number(earnings?.[0]?.balance) || 0;
	const totalEarnings = Number(earnings?.[0]?.grossEarnings) || 0;
	const netEarnings = Number(earnings?.[0]?.netEarnings) || 0;
	const totalExpenses = totalEarnings - netEarnings;

	// Keep numeric values for calculations
	const numericValues = {
		balance,
		totalEarnings,
		netEarnings,
		totalExpenses,
	};

	// Format numbers with commas for display
	const formattedBalance = formatNumberWithCommas(balance);
	const formattedTotalEarnings = formatNumberWithCommas(totalEarnings);
	const formattedNetEarnings = formatNumberWithCommas(netEarnings);
	const formattedTotalExpenses = formatNumberWithCommas(totalExpenses);

	return (
		<div className="Finance">
			<div className="Header">
				<i className="fa fa-chart-line"></i>
				<h3>Finance</h3>
			</div>
			<div className="FinanceContainer">
				<div className="FinanceLeft">
					<FinanceCards
						user={user}
						getTimelabel={getTimelabel}
						users={users}
						earnings={earnings}
						balance={numericValues.balance}
						totalEarnings={numericValues.totalEarnings}
						netEarnings={numericValues.netEarnings} // Pass numeric values
						totalExpenses={numericValues.totalExpenses} // Pass numeric values
						formattedBalance={formattedBalance} // Pass formatted values for display
						formattedTotalEarnings={formattedTotalEarnings} // Pass formatted values for display
						formattedNetEarnings={formattedNetEarnings} // Pass formatted values for display
						formattedTotalExpenses={formattedTotalExpenses} // Pass formatted values for display
					/>
					<div className="Transactions">
						<div className="Header">
							<i className="fa fa-history"></i>
							<h3>Transactions</h3>
						</div>
						<Transactions
							user={user}
							users={users}
							earnings={earnings}
							getTimelabel={getTimelabel}
							balance={numericValues.balance} // Pass numeric values
							totalEarnings={numericValues.totalEarnings} // Pass numeric values
							netEarnings={numericValues.netEarnings} // Pass numeric values
							totalExpenses={numericValues.totalExpenses} // Pass numeric values
							formattedBalance={formattedBalance} // Pass formatted values for display
							formattedTotalEarnings={formattedTotalEarnings} // Pass formatted values for display
							formattedNetEarnings={formattedNetEarnings} // Pass formatted values for display
							formattedTotalExpenses={formattedTotalExpenses} // Pass formatted values for display
						/>
					</div>
				</div>
				<FinanceRight
					user={user}
					getTimelabel={getTimelabel}
					users={users}
					earnings={earnings}
					balance={numericValues.balance} // Pass numeric values
					totalEarnings={numericValues.totalEarnings} // Pass numeric values
					netEarnings={numericValues.netEarnings} // Pass numeric values
					totalExpenses={numericValues.totalExpenses} // Pass numeric values
					formattedBalance={formattedBalance} // Pass formatted values for display
					formattedTotalEarnings={formattedTotalEarnings} // Pass formatted values for display
					formattedNetEarnings={formattedNetEarnings} // Pass formatted values for display
					formattedTotalExpenses={formattedTotalExpenses} // Pass formatted values for display
				/>
			</div>
		</div>
	);
};

export default Finance;

// props validation
Finance.propTypes = {
	user: PropTypes.object.isRequired,
	getTimelabel: PropTypes.func.isRequired,
	earnings: PropTypes.array.isRequired,
	users: PropTypes.array.isRequired,
};
