import React, { useEffect, useState } from "react";
import "./Accepted.css";
import { useParams } from "react-router-dom";
import {
	TextField,
	InputAdornment,
	Dialog,
	DialogContent,
} from "@mui/material";
import ChatUi from "../ChatUi/ChatUi";
import { useHistory } from "react-router-use-history";
import DialogModal from "../DialogModal/DialogModal";

const Accepted = ({
	requests,
	user,
	users,
	getTimeLabel,
	chats,
	setSelectedRequest,
}) => {
	const [selectedChat, setSelectedChat] = useState(null);
	const { id } = useParams();
	const history = useHistory();
	const [active, setActive] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);

	// filter requests by acceptedById
	const acceptedRequests = requests?.filter(
		(request) => request.acceptedById === user._id && request.refId !== user._id
	);

	// fetch sender
	const fetchSender = (senderId) => {
		const sender = users.find((user) => user._id === senderId);
		return sender;
	};

	// fetch chats
	const fetchChats = (senderId) => {
		const chat = chats.find((chat) => chat.refId === senderId);
		return chat;
	};

	// fetch selected request
	const selectedRequest = acceptedRequests?.find(
		(request) => request._id === id
	);
	const sender = users?.find((user) => user._id === selectedRequest?.refId);

	const handleChatClick = (request) => {
		setSelectedChat(request);
		setActive(true);

		history.push(`/requests/${request._id}`);
	};

	useEffect(() => {
		if (selectedChat && selectedChat._id === id) {
			setActive(true);
		} else {
			setActive(false);
		}
	}, [selectedChat, id]);

	const handleModal = () => {
		setIsModalOpen(!isModalOpen);
	};

	return (
		<div className="Accepted">
			<div className="Header">
				<i className="fa fa-clipboard-list" />
				<h3>Chat</h3>
			</div>
			<div className="AcceptedContainer">
				<div className="AcceptedLeft bg-gray-100">
					<div className="ChatTop">
						<div className="ChatTopLeft">
							<div className="ChatNav">
								<div className="ImageSection">
									<img
										src={
											user?.profilePicture ||
											"https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
										}
										alt="Sender"
									/>
									{user?.loginStatus === "loggedIn" ? (
										<div className="Online"></div>
									) : (
										<div className="Offline"></div>
									)}
								</div>
								<div className="ChatNavText">
									<span>{user?.name}</span>
									<p>{user?.username}</p>
								</div>
							</div>
						</div>
					</div>
					<div className="ChatBottom">
						<div className="SearchBar">
							<TextField
								size="small"
								placeholder="Search users..."
								variant="outlined"
								fullWidth
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<i className="fa fa-search"></i>
										</InputAdornment>
									),
								}}
							/>
						</div>
						<div className="ChatUsers">
							{acceptedRequests?.map((request) => {
								const sender = fetchSender(request.refId);
								const chat = fetchChats(request.refId);
								const lastMessage =
									chat?.conversations[0]?.messages[
										chat.conversations[0]?.messages.length - 1
									];

								return (
									<div
										className={
											active && selectedChat?._id === request._id
												? "ChatUser Active bg-white"
												: "ChatUser"
										}
										key={request._id}
										onClick={() => handleChatClick(request)}
									>
										<div className="ChatUserImage">
											<img
												src={
													sender?.profilePicture ||
													"https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
												}
												alt="Sender"
											/>
											{sender?.loginStatus === "loggedIn" ? (
												<div className="Online"></div>
											) : (
												<div className="Offline"></div>
											)}
										</div>
										<div className="ChatDetails">
											<div className="ChatUserText">
												<div className="TopPart">
													<span>{sender?.username}</span>

													<div className="ChatTime">
														<span>
															{lastMessage?.timestamp
																? getTimeLabel(lastMessage?.timestamp)
																: getTimeLabel(request?.date)}
														</span>
													</div>
												</div>
												<div className="Message">
													<span>
														{lastMessage?.sender === user._id
															? "You"
															: lastMessage?.senderName === sender.username
															? lastMessage?.senderName
															: "Admin"}
														:{" "}
													</span>
													<p>
														{lastMessage?.message
															? lastMessage?.message
															: "Wait for customer"}
													</p>
												</div>
											</div>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</div>
				<div className="AcceptedRight">
					<div className="ChatTop">
						<div className="ChatTopLeft1">
							<div className="ChatNav">
								<div className="ImageSection">
									<img
										src={
											sender?.profilePicture ||
											"https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
										}
										alt="Sender"
									/>
									{sender?.loginStatus === "loggedIn" ? (
										<div className="Online"></div>
									) : (
										<div className="Offline"></div>
									)}
								</div>
								<div className="ChatNavText">
									<span>{sender?.name}</span>
									<p>{sender?.username}</p>
								</div>
							</div>
						</div>
						<div className="ChatTopRight">
							<div className="More">
								<i className="fas fa-phone"></i>
								<i className="fas fa-video"></i>
								<i className="fa fa-ellipsis-v" onClick={handleModal}></i>
							</div>
						</div>
						{isModalOpen && (
							<Dialog
								open={isModalOpen}
								onClose={handleModal}
								aria-labelledby="alert-dialog-title"
								aria-describedby="alert-dialog-description"
								className="MoreDialog"
								handleClose={handleModal}
								setSelectedRequest={setSelectedRequest}
							>
								<DialogContent>
									<DialogModal
										open={isModalOpen}
										onClose={handleModal}
										user={user}
										selectedRequest={selectedRequest}
										sender={sender}
									/>
								</DialogContent>
							</Dialog>
						)}
					</div>
					<ChatUi
						sender={sender}
						user={user}
						chats={chats}
						selectedRequest={selectedRequest}
						getTimeLabel={getTimeLabel}
					/>
				</div>
			</div>
		</div>
	);
};

export default Accepted;
