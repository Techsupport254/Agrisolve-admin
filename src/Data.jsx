import Billing from "./Components/Billing/Billing";
import General from "./Components/General/General";
import ProfileNoti from "./Components/ProfileNoti/ProfileNoti";
import Security from "./Components/Security/Security";

// sidebardata
export const sidebardata = [
	{
		id: 1,
		title: "Dashboard",
		path: "/",
		icon: <i className="fas fa-tachometer-alt"></i>,
		management: false,
	},
	{
		id: 2,
		title: "Users",
		path: "/users",
		icon: <i className="fas fa-users"></i>,
		management: false,
		admin: true,
	},
	{
		id: 3,
		title: "Products",
		path: "/products",
		icon: <i className="fas fa-boxes"></i>,
		management: false,
	},
	{
		id: 4,
		title: "Requests",
		path: "/requests",
		icon: <i className="fas fa-clipboard-list"></i>,
		management: false,
	},
	{
		id: 5,
		title: "Analytics",
		path: "/reports",
		icon: <i className="fas fa-chart-line"></i>,
		management: false,
	},
	{
		id: 6,
		title: "Finance",
		path: "/finance",
		icon: <i className="fas fa-money-bill-wave"></i>,
		management: false,
	},
	{
		id: 7,
		title: "User",
		path: "/user",
		icon: <i className="fas fa-user"></i>,
		management: true,
	},
	{
		id: 8,
		title: "Chats",
		path: "/chats",
		icon: <i className="fas fa-comment"></i>,
		management: true,
	},
	{
		id: 9,
		title: "News",
		path: "/news",
		icon: <i className="fas fa-newspaper"></i>,
		management: true,
	},
	{
		id: 10,
		title: "Blogs",
		path: "/blogs",
		icon: <i className="fas fa-blog"></i>,
		management: true,
		construction: true,
	},
	{
		id: 11,
		title: "Invoice",
		path: "/invoice",
		icon: <i className="fas fa-file-invoice"></i>,
		management: true,
		construction: true,
	},
	{
		id: 12,
		title: "History",
		path: "/history",
		icon: <i className="fas fa-history"></i>,
		management: true,
		construction: true,
	},
	{
		id: 13,
		title: "Orders",
		path: "/orders",
		icon: <i className="fas fa-shopping-cart"></i>,
		management: false,
		construction: true,
	},
];
function generateMonthlyFinancialData() {
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	const revenueData = months.map(
		() => Math.floor(Math.random() * (2000 - 500 + 1)) + 500
	);
	const expensesData = months.map(
		() => Math.floor(Math.random() * (1500 - 300 + 1)) + 300
	);
	const totalRevenue = revenueData.reduce((acc, val) => acc + val, 0);
	const totalExpenses = expensesData.reduce((acc, val) => acc + val, 0);

	const carddata = [
		{
			id: 1,
			title: "Total Income",
			icon: "fas fa-dollar-sign",
			value: totalRevenue - totalExpenses,
			barValue: 500,
			color: {
				backGround: "linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%)",
				boxShadow: "0px 10px 20px 0px #F9D59B",
			},
			series: [
				{
					name: "Income",
					data: months.map(
						(_, index) => revenueData[index] - expensesData[index]
					),
				},
			],
		},
		{
			id: 2,
			title: "Total Sales",
			icon: "fas fa-shopping-cart",
			value: totalRevenue,
			barValue: 350,
			color: {
				backGround: "linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)",
				boxShadow: "0px 10px 20px 0px #FDC0C7",
			},
			series: [
				{
					name: "Revenue",
					data: revenueData,
				},
			],
		},
		{
			id: 3,
			title: "Total Expenses",
			icon: "fas fa-money-bill-wave",
			value: totalExpenses,
			barValue: 250,
			color: {
				backGround: "linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%)",
				boxShadow: "0px 10px 20px 0px #e0c6f5",
			},
			series: [
				{
					name: "Expenses",
					data: expensesData,
				},
			],
		},
	];

	return carddata;
}

// Export the result of generateMonthlyFinancialData
export const carddata = generateMonthlyFinancialData();

function getRandomValue(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Helper function to generate random values within a range
const getRandomVal = (min, max) =>
	Math.floor(Math.random() * (max - min + 1)) + min;

// Helper function to generate random colors
const getRandomCol = () => {
	const letters = "0123456789ABCDEF";
	let color = "#";
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
};

export const chartdata = [
	"Jan",
	"Feb",
	"March",
	"April",
	"May",
	"June",
	"July",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
].map((month) => {
	const sales = getRandomVal(400, 600);
	const expenses = getRandomVal(200, 300);
	const income = sales - expenses; // Income is sales minus expenses

	return {
		month,
		income,
		sales,
		expenses,
		color: getRandomCol(),
	};
});

function getRandomColor() {
	const letters = "0123456789ABCDEF";
	let color = "#";
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}

export const PieChartdata = [
	{
		name: "Income",
		value: 1000,
		color: "#8884d8",
	},
	{
		name: "Sales",
		value: 500,
		color: "#82ca9d",
	},
	{
		name: "Expenses",
		value: 250,
		color: "#ffc658",
	},
];

export const requestsNavigations = [
	{
		name: "All",
		icon: <i className="fa fa-list"></i>,
		active: true,
		color: "purple",
	},

	{
		name: "Accepted",
		icon: <i className="fas fa-check-circle"></i>,
		active: false,
		color: "blue",
	},
	{
		name: "Approved",
		icon: <i className="fa fa-check"></i>,
		active: false,
		color: "green",
	},
	{
		name: "Pending",
		icon: <i className="fa fa-clock"></i>,
		active: false,
		color: "orange",
	},
	{
		name: "Rejected",
		icon: <i className="fa fa-times"></i>,
		active: false,
		color: "red",
	},
];

// analytics data
export const analyticsData = [
	{
		id: 1,
		title: "Orders Completed",
		icon: <i className="fas fa-shopping-cart"></i>,
		value: 1000,
		color: "var(--success-darker)",
		bg: "var(--success-lighter)",
	},
	{
		id: 1,
		title: "Total Revenue",
		icon: <i className="fa-solid fa-chart-column"></i>,
		value: 50000,
		color: "var(--primary-darker)",
		bg: "var(--primary-lighter)",
	},
	{
		id: 2,
		title: "Total Sales",
		icon: <i className="fas fa-shopping-cart"></i>,
		value: 1500,
		color: "var(--secondary-darker)",
		bg: "var(--secondary-lighter)",
	},
	{
		id: 3,
		title: "Total Customers Served",
		icon: <i className="fas fa-users"></i>,
		value: 300,
		color: "var(--warning-darker)",
		bg: "var(--warning-lighter)",
	},
];

// news data
export const newsData = [
	{
		id: 1,
		title: "Lorem ipsum dolor sit amet.",
		description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
		image: "https://picsum.photos/200/300",
		timestamp: "2021-05-01T12:00:00.000Z",
	},
	{
		id: 2,
		title: "Lorem ipsum dolor sit amet.",
		description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
		image: "https://picsum.photos/200/300",
		timestamp: "2021-05-01T12:00:00.000Z",
	},
	{
		id: 3,
		title: "Lorem ipsum dolor sit amet.",
		description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
		image: "https://picsum.photos/200/300",
		timestamp: "2021-05-01T12:00:00.000Z",
	},
	{
		id: 4,
		title: "Lorem ipsum dolor sit amet.",
		description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
		image: "https://picsum.photos/200/300",
		timestamp: "2021-05-01T12:00:00.000Z",
	},
	{
		id: 5,
		title: "Lorem ipsum dolor sit amet.",
		description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
		image: "https://picsum.photos/200/300",
		timestamp: "2021-05-01T12:00:00.000Z",
	},
	{
		id: 6,
		title: "Lorem ipsum dolor sit amet.",
		description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
		image: "https://picsum.photos/200/300",
		timestamp: "2021-05-01T12:00:00.000Z",
	},
];

// history data
export const historyData = [
	{
		id: 1,
		title: "Lorem ipsum dolor sit amet.",
		description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
		timestamp: "2021-05-01T12:00:00.000Z",
	},
	{
		id: 2,
		title: "Lorem ipsum dolor sit amet.",
		description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
		image: "https://picsum.photos/200/300",
		timestamp: "2021-05-01T12:00:00.000Z",
	},
	{
		id: 3,
		title: "Lorem ipsum dolor sit amet.",
		description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
		image: "https://picsum.photos/200/300",
		timestamp: "2022-05-01T12:00:00.000Z",
	},
	{
		id: 4,
		title: "Lorem ipsum dolor sit amet.",
		description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
		image: "https://picsum.photos/200/300",
		timestamp: "2021-05-01T12:00:00.000Z",
	},
	{
		id: 5,
		title: "Lorem ipsum dolor sit amet.",
		description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
		image: "https://picsum.photos/200/300",
		timestamp: "2021-05-01T12:00:00.000Z",
	},
	{
		id: 6,
		title: "Lorem ipsum dolor sit amet.",
		description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
		image: "https://picsum.photos/200/300",
		timestamp: "2021-05-01T12:00:00.000Z",
	},
];

// user data
export const profileData = [
	{
		id: 1,
		name: "General",
		icon: <i className="fas fa-cog"></i>,
		component: <General />,
	},
	{
		id: 2,
		name: "Billing",
		icon: <i className="fa fa-credit-card"></i>,
		component: <Billing />,
	},
	{
		id: 3,
		name: "Security",
		icon: <i className="fas fa-lock"></i>,
		component: <Security />,
	},
	{
		id: 4,
		name: "Notifications",
		icon: <i className="fas fa-bell"></i>,
		component: <ProfileNoti />,
	},
];

// invoice data
export const invoiceData = [
	{
		id: 1,
		title: "INV-0001",
		date: "2021-05-01T12:00:00.000Z",
		amount: 1000,
		status: "paid",
	},
	{
		id: 2,
		title: "INV-0002",
		date: "2021-05-01T12:00:00.000Z",
		amount: 1000,
		status: "pending",
	},
	{
		id: 3,
		title: "INV-0003",
		date: "2021-05-01T12:00:00.000Z",
		amount: 1000,
		status: "paid",
	},
	{
		id: 4,
		title: "INV-0004",
		date: "2021-05-01T12:00:00.000Z",
		amount: 1000,
		status: "pending",
	},
	{
		id: 5,
		title: "INV-0005",
		date: "2021-05-01T12:00:00.000Z",
		amount: 1000,
		status: "paid",
	},
	{
		id: 6,
		title: "INV-0006",
		date: "2021-05-01T12:00:00.000Z",
		amount: 1000,
		status: "pending",
	},
];

// earnings and expenses data

export const FinanceData = [
	{ month: "January", sales: 8000, expense: 3000, income: 5000 },
	{ month: "February", sales: 9500, expense: 3500, income: 6000 },
	{ month: "March", sales: 11000, expense: 4000, income: 7000 },
	{ month: "April", sales: 9300, expense: 3800, income: 5500 },
	{ month: "May", sales: 12200, expense: 4200, income: 8000 },
	{ month: "June", sales: 11400, expense: 3900, income: 7500 },
	{ month: "July", sales: 13500, expense: 4500, income: 9000 },
	{ month: "August", sales: 12600, expense: 4100, income: 8500 },
	{ month: "September", sales: 13800, expense: 4300, income: 9500 },
	{ month: "October", sales: 10800, expense: 3800, income: 7000 },
	{ month: "November", sales: 11500, expense: 4000, income: 7500 },
	{ month: "December", sales: 12700, expense: 4200, income: 8500 },
];
