import React, { useEffect } from "react";
import "./News.css";
import { InputAdornment, Switch, TextField } from "@mui/material";
import select from "../../assets/select.png";
import axios from "axios";

const News = () => {
	const [title, setTitle] = React.useState("");
	const [description, setDescription] = React.useState("");
	const [link, setLink] = React.useState("");
	const [eventDate, setEventDate] = React.useState("");
	const [from, setFrom] = React.useState("");
	const [to, setTo] = React.useState("");
	const [images, setImages] = React.useState([]);
	const [checked, setChecked] = React.useState(false);
	const [location, setLocation] = React.useState("Online");
	const [address, setAddress] = React.useState("Online");
	const [fee, setFee] = React.useState();
	const [online, setOnline] = React.useState(false);
	const [selectedFiles, setSelectedFiles] = React.useState([]); // Track selected files for Cloudinary upload
	const [productImages, setProductImages] = React.useState([]);
	const [uploaded, setUploaded] = React.useState(false);
	const [uploading, setUploading] = React.useState(false);
	const [error, setError] = React.useState("");
	const [success, setSuccess] = React.useState("");

	const handleCheckChange = (event) => {
		setChecked(event.target.checked);
	};

	const handleBrowseClick = () => {
		const fileInput = document.getElementById("file-input");
		fileInput.click();
	};

	const handleFileInputChange = (e) => {
		const files = e.target.files;
		const images = [];
		for (let i = 0; i < files.length; i++) {
			images.push(files[i]);
		}
		setImages(images);
		setSelectedFiles(images); // Store selected files for upload
	};

	const handleOnlineChange = () => {
		// Toggle the `online` state
		setOnline(!online);
	};

	useEffect(() => {
		if (checked) {
			setOnline(true);
		} else {
			setOnline(false);
		}
	}, [checked]);

	const handleCreate = async () => {
		setUploading(true);

		const CLOUD_NAME = __CLOUD_NAME__;
		const PRESET_NAME = __UPLOAD_PRESET__;

		try {
			const imageUrls = [];

			for (const file of selectedFiles) {
				const formData = new FormData();
				formData.append("file", file);
				formData.append("upload_preset", PRESET_NAME);

				const response = await axios.post(
					`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
					formData
				);

				if (response.status === 200) {
					imageUrls.push(response.data.secure_url);
					console.log("Image uploaded:", response.data);
				} else {
					console.error("Error uploading image:", response.data);
					setError("Error uploading image");
					setUploading(false); // Clear uploading state on error
					return; // Exit the function on error
				}
			}

			// Update the images state with the uploaded image URLs
			setProductImages((prevImages) => [...prevImages, ...imageUrls]);

			// Set success message
			setSuccess("Images Uploaded successfully");

			// Upload news data to the database if images are uploaded successfully
			if (imageUrls.length > 0) {
				const newsData = {
					title: title,
					event: checked,
					description: description,
					link: link,
					eventDate: eventDate,
					from: from,
					to: to,
					images: productImages,
					location: location,
					address: address,
					fee: fee,
					online: online,
				};

				const response = await axios.post(
					"https://agrisolve.vercel.app/news",
					newsData
				);

				if (response.status === 200) {
					console.log("News created:", response.data);
					setSuccess("News created successfully");
				} else {
					console.error("Error creating news:", response.data);
					setError("Error creating news");
				}
			}

			setUploading(false);
		} catch (error) {
			console.error("Error uploading images:", error);
			setUploading(false);
			setError("Error uploading images");
		}
	};

	return (
		<div className="NewsPage">
			<div className="Header">
				<i className="fas fa-newspaper"></i>
				<h3>News</h3>
			</div>
			<div className="NewsContainer">
				<div className="Lists">
					<ul>
						<li>Dashboard</li>
						<li>News</li>
						<li>Create</li>
					</ul>
				</div>
				<div className="Create">
					<div className="CreateLeft">
						<h3>Add news</h3>
					</div>
					<div className="CreateRight">
						<div className="Event">
							<TextField
								id="outlined-basic"
								label="Title"
								variant="outlined"
								size="small"
								fullWidth
								color="success"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
							/>
							<div className="SwitchEvent">
								<h3>Event</h3>
								<Switch
									color="success"
									inputProps={{ "aria-label": "checkbox with default color" }}
									checked={checked}
									onChange={handleCheckChange}
								/>
							</div>
						</div>
						<TextField
							id="outlined-basic"
							label="Description"
							variant="outlined"
							size="small"
							fullWidth
							multiline
							rows={4}
							color="success"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
						<div className="ImageInput">
							<span>Images</span>
							<div className="InputField" onClick={handleBrowseClick}>
								{images.length > 0 ? (
									<div className="Images">
										{images.map((image, index) => (
											<div className="Image" key={index}>
												<div className="Close">
													<i
														className="fas fa-times"
														onClick={() => handleRemoveImage(index)}
													></i>
												</div>
												<img
													src={URL.createObjectURL(image)}
													alt={`Image ${index + 1}`}
												/>
											</div>
										))}
									</div>
								) : (
									<>
										<img src={select} alt="select" />
										<p>
											Drag and drop images here or click to{" "}
											<span
												className="BrowseButton"
												onClick={handleBrowseClick}
											>
												Browse
											</span>
											<input
												type="file"
												id="file-input"
												hidden
												onChange={handleFileInputChange}
												multiple
											/>
										</p>
									</>
								)}
							</div>
						</div>
						<TextField
							id="outlined-basic"
							label="Link"
							variant="outlined"
							size="small"
							fullWidth
							color="success"
							value={link}
							onChange={(e) => setLink(e.target.value)}
						/>
						{checked && (
							<>
								<div className="Event">
									<TextField
										id="outlined-basic"
										label="Event Date"
										variant="outlined"
										size="small"
										fullWidth
										color="success"
										type="date"
										InputLabelProps={{
											shrink: true,
										}}
										value={eventDate}
										onChange={(e) => setEventDate(e.target.value)}
									/>
									<TextField
										id="outlined-basic"
										label="From"
										variant="outlined"
										size="small"
										fullWidth
										color="success"
										type="time"
										InputLabelProps={{
											shrink: true,
										}}
										value={from}
										onChange={(e) => setFrom(e.target.value)}
									/>
									<TextField
										id="outlined-basic"
										label="To"
										variant="outlined"
										size="small"
										fullWidth
										color="success"
										value={to}
										onChange={(e) => setTo(e.target.value)}
										type="time"
										InputLabelProps={{
											shrink: true,
										}}
									/>
									<h3>Online</h3>
									<Switch
										color="success"
										inputProps={{ "aria-label": "checkbox with default color" }}
										checked={online}
										onChange={handleOnlineChange}
									/>
								</div>
								<div className="Event">
									<TextField
										id="outlined-basic"
										label="Location"
										variant="outlined"
										size="small"
										fullWidth
										color="success"
										value={location}
										onChange={(e) => setLocation(e.target.value)}
										disabled={online}
									/>
									<TextField
										id="outlined-basic"
										label="Address"
										variant="outlined"
										size="small"
										fullWidth
										color="success"
										value={address}
										onChange={(e) => setAddress(e.target.value)}
										disabled={online}
									/>
									<TextField
										id="outlined-basic"
										label="Fee"
										variant="outlined"
										size="small"
										fullWidth
										color="success"
										value={fee}
										type="number"
										onChange={(e) => setFee(e.target.value)}
										InputProps={{
											startAdornment: (
												<InputAdornment position="start">KES</InputAdornment>
											),
										}}
									/>
								</div>
							</>
						)}
						<button onClick={handleCreate}>
							{uploading ? (
								<>
									<i className="fas fa-circle-notch fa-spin"></i>&nbsp;&nbsp;
									<span>Uploading</span>
								</>
							) : (
								<>
									<i className="fas fa-plus"></i>&nbsp;&nbsp;
									<span>Create</span>
								</>
							)}
						</button>
						{error && <p className="Error">{error}</p>}
						{success && <p className="Success">{success}</p>}
					</div>
				</div>
			</div>
		</div>
	);
};

export default News;
