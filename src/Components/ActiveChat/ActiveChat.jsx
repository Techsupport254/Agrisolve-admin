import React, { useState, useEffect } from "react";
import "./ActiveChat.css";
import { useParams } from "react-router-dom";
import { TextField } from "@mui/material";
import axios from "axios";
import nochat from "../../assets/nochat.png";

const ActiveChat = ({
	chats,
	getTimeLabel,
	user,
	getUserDetails,
	selectedRequest,
	setChats,
}) => {
	const id = useParams().id;
	const [message, setMessage] = useState("");
	const activeChat = chats.find((chat) => chat?._id === id);
	// Check if activeChat is undefined
	if (!activeChat) {
		return (
			<div className="ActiveChat">
				<div className="NoChat">
					<h3>No Chat Selected</h3>
					<img src={nochat} alt="no chat" />
					<p>
						Select a chat to start messaging with the user or create a new chat
						by accepting a request.
					</p>
				</div>
			</div>
		);
	}

	// Initialize chatMap
	const chatMap = new Map();

	// Check if conversations exist before mapping them
	if (activeChat?.conversations?.[0]?.messages) {
		// Get the conversations
		const conversations = activeChat.conversations[0].messages;

		// Group the conversations by date
		conversations.forEach((conversation) => {
			const date = new Date(conversation.timestamp).toDateString();
			if (chatMap.has(date)) {
				chatMap.get(date).push(conversation);
			} else {
				chatMap.set(date, [conversation]);
			}
		});
	}

	// Get the selected request
	const selectedRequestId = selectedRequest?._id;
	console.log("selectedRequestId", selectedRequestId);

	const handleFormSubmit = (e) => {
		e.preventDefault();

		const newMessage = {
			id: selectedRequestId,
			refId: user?._id,
			recipient: activeChat?.refId,
			recipientName: getUserDetails(activeChat)?.username,
			sender: user?._id,
			senderName: user?.username,
			message: message,
		};

		axios
			.post("https://agrisolve.vercel.app/chats/add", newMessage)
			.then((response) => {
				console.log(response.data);
			})
			.catch((error) => {
				console.error("Error sending message:", error);
			});

		setMessage("");
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
					if (prevChat.conversations[0].id === conversationId) {
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

	return (
		<div className="ActiveChat">
			<div className="ChatUser">
				<div className="Avatar">
					<img src={getUserDetails(activeChat)?.profilePicture} alt="avatar" />
				</div>
				<div className="UserDetails">
					<span>{getUserDetails(activeChat)?.username}</span>
					<p>
						{getTimeLabel(
							activeChat?.conversations[0]?.messages.slice(-1)[0]?.timestamp
						)}
					</p>
				</div>
			</div>
			<div className="ChatBody">
				{Array.from(chatMap).map(([date, conversations]) => (
					<div className="ChatDate" key={date}>
						<span
							className="Date"
							style={{
								// if date is today
								position: date === new Date().toDateString() ? "sticky" : "",
							}}
						>
							{getTimeLabel(date)}
						</span>
						{conversations.map((conversation) => (
							<div
								className={`ChatMessage ${
									conversation.sender === user._id ? "Received " : "Sent"
								}`}
								key={conversation._id}
							>
								<p
									className={`Message ${
										conversation.sender === user._id
											? "var(--glass) "
											: "bg-gray-100"
									}`}
								>
									{conversation.message}
								</p>
								<small>
									{getTimeLabel(conversation.timestamp)}
									&nbsp;
									<span>
										{conversation.status === "read" &&
										conversation.sender === user?._id
											? "Seen"
											: null}
									</span>
								</small>
							</div>
						))}
					</div>
				))}
			</div>
			<div className="ChatFooter">
				<form onSubmit={handleFormSubmit}>
					<div className="InputField">
						<TextField
							variant="outlined"
							fullWidth
							placeholder="Type a message"
							size="small"
							color="success"
							value={message}
							onChange={(e) => setMessage(e.target.value)}
						/>
					</div>
					<div className="Attachments">
						<button>
							<i className="fas fa-paperclip"></i>
						</button>
						<button>
							<i className="fas fa-microphone"></i>
						</button>
					</div>
					<button type="submit">
						<i className="fas fa-paper-plane"></i>
					</button>
				</form>
			</div>
		</div>
	);
};

export default ActiveChat;
