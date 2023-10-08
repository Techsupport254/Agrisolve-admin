import React, { useEffect, useState } from "react";
import "./Chats.css";
import { InputAdornment, TextField } from "@mui/material";
import ActiveChat from "../../Components/ActiveChat/ActiveChat";
import { useHistory } from "react-router-use-history";
import axios from "axios";
import nochat from "../../assets/nochat.png";

const Chats = ({ chats, user, users, getTimeLabel }) => {
	const [activeChat, setActiveChat] = useState(null);
	const [search, setSearch] = useState("");
	const history = useHistory();
	const [consults, setConsults] = useState([]);
	const [selectedRequest, setSelectedRequest] = useState(null);
	const [chatId, setChatId] = useState(null);

	// Get all consults
	useEffect(() => {
		const getConsults = async () => {
			const res = await axios.get(
				"https://agrisolve-techsupport254.vercel.app/consults/consults"
			);
			setConsults(res.data);
		};
		getConsults();
	}, []);

	// Filter chats where the user is the recipient
	const filteredChats = chats.filter(
		(chat) =>
			chat?.recipient === user?._id &&
			consults.find((consult) => consult.acceptedById === user?._id) &&
			user?._id !== chat?.refId
	);

	const handleSearch = (e) => {
		setSearch(e.target.value);
	};
	const updateChat = async (selectedChat) => {
		try {
			const conversationId = selectedChat.conversations[0].id;
			await axios.patch(
				`https://agrisolve-techsupport254.vercel.app/chats/chats/${conversationId}`,
				{
					id: conversationId,
					status: "read",
				}
			);

			setChats((prevChats) =>
				prevChats.map((prevChat) => {
					if (
						prevChat.conversations[0].id === conversationId &&
						prevChat.conversations[0].messages[0].sender !== user?._id
					) {
						const updatedConversations = prevChat.conversations.map(
							(conversation) => ({
								...conversation,
								messages: conversation.messages.map((message) => ({
									...message,
									status: "read",
								})),
							})
						);
						return { ...prevChat, conversations: updatedConversations };
					}
					return prevChat;
				})
			);
		} catch (error) {
			console.error("Error updating chat:", error);
		}
	};
	const handleChatClick = (chat) => {
		setActiveChat(chat);
		// Mark all the messages as read
		const unreadMessages = chat?.conversations[0]?.messages.filter(
			(message) => message.status !== "read" && message.sender !== user?._id
		);
		unreadMessages.forEach((message) => {
			message.status = "read";
		});

		// Update the chat
		updateChat(chat);

		const activechatId = chat?.conversations?.[0].id;
		setChatId(activechatId);

		// Update selectedRequest immediately
		const selectedConsult = consults.find(
			(consult) => consult._id === activechatId
		);
		setSelectedRequest(selectedConsult);

		// navigate to the chat
		history.push(`/chats/${chat._id}`);
	};

	// Get user details for a chat
	const getUserDetails = (chat) => {
		const userId = chat?.refId;
		const userDetails = users.find((user) => user._id === userId);
		return userDetails;
	};

	// Get the last message for a chat
	const getLastMessage = (chat) => {
		const lastMessage = chat?.conversations[0]?.messages.slice(-1)[0];
		return lastMessage?.message; // Return the message text
	};

	const unreadCount = (chat) => {
		const unreadMessages = chat?.conversations[0]?.messages.filter(
			(message) => message.status !== "read" && message.sender !== user?._id
		);
		return unreadMessages.length;
	};

	return (
		<div className="Chats">
			<div className="Header">
				<i className="fas fa-comment"></i>
				<h3>Chats</h3>
			</div>
			<div className="ChatContainer">
				<div className="ChatDash bg-gray-100">
					<div className="ChatUser">
						<div className="Avatar">
							<img src={user?.profilePicture} alt="avatar" />
						</div>
						<div className="UserDetails">
							<span>{user?.username}</span>
							<p>{user?.email}</p>
						</div>
					</div>
					<div className="ChatSearch">
						<TextField
							size="small"
							color="success"
							fullWidth
							placeholder="Search for user"
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<i className="fas fa-search"></i>
									</InputAdornment>
								),
							}}
							value={search}
							onChange={handleSearch}
						/>
					</div>
					<div className="ChatList">
						{filteredChats.length === 0 && (
							<div className="NoChat">
								<h4>No chats available</h4>
								<img src={nochat} alt="no chat" />
								<p>Start a chat with a user</p>
							</div>
						)}
						{filteredChats.map((chat) => (
							<div
								className={`ChatItem ${
									chat._id === activeChat?._id && "active"
								}`}
								onClick={() => handleChatClick(chat)}
								key={chat._id}
							>
								<div className="Avatar">
									<img
										src={getUserDetails(chat)?.profilePicture}
										alt="avatar"
									/>
								</div>
								<div className="ChatsDetails">
									<div className="ChatTop">
										<span>{getUserDetails(chat)?.username}</span>
										<p>
											{getTimeLabel(
												chat?.conversations[0]?.messages.slice(-1)[0]?.timestamp
											)}
										</p>
									</div>
									<div className="LastMessage">
										<div className="Last">
											<span>
												{chat?.conversations[0]?.messages.slice(-1)[0]
													?.sender === user?._id
													? "You: "
													: ""}
											</span>
											<p
												style={{
													color:
														chat?.conversations[0]?.messages.slice(-1)[0]
															?.status === "read"
															? "#777"
															: "",
												}}
											>
												{getLastMessage(chat)}
											</p>
										</div>
										{unreadCount(chat) > 0 && (
											<span className="unread">{unreadCount(chat)}</span>
										)}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
				<div className="ChatDisplay">
					<ActiveChat
						chats={filteredChats}
						user={user}
						getTimeLabel={getTimeLabel}
						getUserDetails={getUserDetails}
						consults={consults}
						selectedRequest={selectedRequest}
					/>
				</div>
			</div>
		</div>
	);
};

export default Chats;
