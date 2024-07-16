import React, { useState, useEffect } from "react";
import "./ChatUi.css";
import { TextField } from "@mui/material";
import axios from "axios";

const ChatUi = ({
	sender,
	chats,
	selectedRequest,
	getTimeLabel,
	user,
	handleModal,
}) => {
	const [groupedMessages, setGroupedMessages] = useState({});
	const [messages, setMessages] = useState([]);
	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(false);
	const [currentMessages, setCurrentMessages] = useState([]);

	useEffect(() => {
		if (chats && chats.length > 0 && selectedRequest) {
			let consultId = selectedRequest._id;

			let filteredMessages = chats.find(
				(chat) => chat.conversations[0]?.id === consultId
			);

			if (filteredMessages) {
				setCurrentMessages(filteredMessages.conversations[0]?.messages);
			}
		}
	}, [chats, selectedRequest]);

	useEffect(() => {
		if (currentMessages && currentMessages.length > 0) {
			const grouped = currentMessages.reduce((acc, message) => {
				const date = new Date(message.timestamp).toLocaleDateString();
				if (acc[date]) {
					acc[date].push(message);
				} else {
					acc[date] = [message];
				}
				return acc;
			}, {});

			setGroupedMessages(grouped);
		}
	}, [currentMessages]);

	const handleAttachmentClick = () => {
		// TODO
	};

	const handleMediaClick = () => {};

	const handleFormSubmit = (e) => {
		e.preventDefault();

		const newMessage = {
			id: selectedRequest?._id,
			refId: user?._id,
			recipient: selectedRequest?.acceptedById,
			recipientName: selectedRequest?.acceptedBy,
			sender: user?._id,
			senderName: user?.name,
			message: message,
		};

		axios
			.post("http://localhost:8000/chats/chats/add", newMessage)
			.then((response) => {
				console.log(response.data);
				fetchChatMessages();
			})
			.catch((error) => {
				console.error("Error sending message:", error);
			});

		setMessage("");

		console.log("Message sent:", newMessage);
	};

	return (
		<div className="ChatUi">
			<div className="ChatMessages">
				{loading ? (
					<div className="LoadingMessages">
						<i className="fas fa-spinner fa-spin"></i>
					</div>
				) : null}

				{Object.entries(groupedMessages).map(([date, messages]) => (
					<div className="Grouped" key={date}>
						<div className="GroupDateContainer">
							<div className="GroupDate">
								{date === new Date().toLocaleDateString()
									? "Today"
									: date ===
									  new Date(Date.now() - 86400000).toLocaleDateString()
									? "Yesterday"
									: date}
							</div>
						</div>
						{messages.map((message, index) => (
							<div
								className={`message ${
									message.senderName === user?.name || user?.username
										? "SenderMessage"
										: "ReceiverMessage"
								}`}
								key={index}
							>
								<div
									className="MessageContent"
									style={{
										backgroundColor: `${
											message.senderName === user?.name || user?.username
												? "var(--success-lighter)"
												: "#f1f0f0"
										}`,

										color: `${
											message.senderName === user?.name || user?.username
												? "var(--success-darker)"
												: "#333"
										}`,

										borderRadius: `${
											message.senderName === user?.name || user?.username
												? "10px 0 10px 10px"
												: "0 10px 10px 10px"
										}`,

										marginLeft: `${
											message.senderName === user?.name || user?.username
												? "auto"
												: "0"
										}`,

										marginRight: `${
											message.senderName === user?.name || user?.username
												? "0"
												: "auto"
										}`,

										marginBottom: `${
											message.senderName === user?.name || user?.username
												? "10px"
												: "0"
										}`,

										marginTop: `${
											message.senderName === user?.name || user?.username
												? "10px"
												: "0"
										}`,
									}}
								>
									{message.message}
								</div>
								<div className="MessageTime">
									{new Date(message.timestamp).toLocaleTimeString([], {
										hour: "2-digit",
										minute: "2-digit",
									})}
								</div>
							</div>
						))}
					</div>
				))}

				{currentMessages === null || currentMessages.length === 0 ? (
					<div
						className="NoMessages"
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						No messages yet
					</div>
				) : null}
			</div>
			<div className="ChatInput">
				{currentMessages === null || currentMessages.length === 0 ? (
					<form onSubmit={handleFormSubmit}>
						<TextField
							placeholder="Please wait for the user to start a chat!"
							fullWidth
							disabled
							size="small"
							color="success"
						/>
						<div className="Media">
							<i
								className="fas fa-paperclip"
								onClick={handleAttachmentClick}
								disabled
							></i>
							<i
								className="fas fa-camera"
								onClick={handleMediaClick}
								disabled
							></i>
						</div>
						<button type="submit" className="SendButton" disabled>
							Send &nbsp; <i className="fas fa-paper-plane"></i>
						</button>
					</form>
				) : (
					<form onSubmit={handleFormSubmit}>
						<TextField
							placeholder="Type your message..."
							value={message}
							onChange={(e) => setMessage(e.target.value)}
							fullWidth
							size="small"
							color="success"
						/>
						<div className="Media">
							<i
								className="fas fa-paperclip"
								onClick={handleAttachmentClick}
							></i>
							<i className="fas fa-camera" onClick={handleMediaClick}></i>
						</div>
						<button type="submit" className="SendButton">
							Send &nbsp; <i className="fas fa-paper-plane"></i>
						</button>
					</form>
				)}
			</div>
		</div>
	);
};

export default ChatUi;
