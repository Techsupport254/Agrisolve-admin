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

// carddata
export const carddata = [
	{
		id: 1,
		title: "Total Income",
		icon: <i className="fas fa-dollar-sign"></i>,
		value: 1000,
		barValue: 500,
		color: {
			backGround: "linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%)",
			boxShadow: "0px 10px 20px 0px #F9D59B",
		},
		series: [
			{
				name: "Sales",
				data: [44, 55, 41, 67, 22, 43, 21, 49, 21, 49, 21, 49],
			},
		],
	},
	{
		id: 2,
		title: "Total Sales",
		icon: <i className="fas fa-shopping-cart"></i>,
		value: 1000,
		barValue: 350,
		color: {
			backGround: "linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)",
			boxShadow: "0px 10px 20px 0px #FDC0C7",
		},
		series: [
			{
				name: "Revenue",
				data: [10, 100, 50, 70, 80, 30, 40],
			},
		],
	},
	{
		id: 3,
		title: "Total Expenses",
		icon: <i className="fas fa-money-bill-wave"></i>,
		value: 1000,
		barValue: 250,
		color: {
			backGround: "linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%)",
			boxShadow: "0px 10px 20px 0px #e0c6f5",
		},
		series: [
			{
				name: "Users",
				data: [10, 100, 50, 70, 80, 30, 40],
			},
		],
	},
];

export const chartdata = [
	{
		month: "January",
		income: 1000,
		sales: 500,
		expenses: 250,
		color: "#8884d8",
	},
	{
		month: "February",
		income: 1000,
		sales: 500,
		expenses: 250,
		color: "#82ca9d",
	},
	{
		month: "March",
		income: 1000,
		sales: 500,
		expenses: 250,
		color: "#ffc658",
	},
	{
		month: "April",
		income: 1000,
		sales: 500,
		expenses: 250,
		color: "#8884d8",
	},
];

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
		title: "Weekly Sales",
		icon: <i className="fas fa-shopping-cart"></i>,
		value: 1000,
		color: "rgba(0, 120, 103, 1)",
		color2: "rgba(0, 120, 103, 1)",
		color3: "rgba(0, 75, 80, 1)",
		backGround: "rgba(200, 250, 214, 1)",
	},
	{
		id: 2,
		title: "Weekly Income",
		icon: <i className="fas fa-dollar-sign"></i>,
		value: 1000,
		color: "rgba(198, 132, 255, 1)",
		color2: "rgba(81, 25, 183, 1)",
		color3: "rgba(39, 9, 122, 1)",
		backGround: "rgba(239, 214, 255, 1)",
	},
	{
		id: 3,
		title: "Weekly Expenses",
		icon: <i className="fas fa-money-bill-wave"></i>,
		value: 1000,
		color: "rgba(0, 108, 156, 1)",
		color2: "rgba(0, 108, 156, 1)",
		color3: "rgba(0, 55, 104, 1)",
		backGround: "rgba(202, 253, 245, 1)",
	},
	{
		id: 4,
		title: "New Customers",
		icon: <i className="fas fa-users"></i>,
		value: 1000,
		color2: "rgba(183, 110, 0, 1)",
		color: "rgba(183, 110, 0, 1)",
		color3: "rgba(122, 65, 0, 1)",
		backGround: "rgba(255, 245, 204, 1)",
	},
	{
		id: 5,
		title: "Total Orders",
		icon: <i className="fas fa-boxes"></i>,
		value: 1000,
		color: "rgba(91, 228, 155, 1)",
		color2: "rgba(0, 120, 103, 1)",
		color3: "rgba(0, 75, 80, 1)",
		backGround: "rgba(211, 252, 210, 1)",
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
