import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		fullName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			minlength: 6,
		},
		gender: {
			type: String,
			required: true,
			enum: ["male", "female","transgender"],
		},
		role: {
			type: String,
			required: true,
			enum: ["admin", "user"],
		},
		organization: {
			type: mongoose.Schema.Types.ObjectId,
			ref:'Organization'
		}
		// createdAt, updatedAt => Member since <createdAt>
	},
	{ timestamps: true }
);


const User = mongoose.model("User", userSchema);

export default User;
