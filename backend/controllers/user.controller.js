import Organization from "../models/Organization.model.js";
import User from "../models/user.model.js";

export const getUserProfile = async (req, res) => {
	try {
		const loggedInUserId = req.user._id;
		let userProfile = await User.findOne({ _id: loggedInUserId}).select("-password");
		const organization = await Organization.findById(userProfile.organization)
		let orgName = null
		if(organization)
		    orgName = organization.orgName
		res.success({user:{...userProfile._doc,orgName}});
	} catch (error) {
		console.error("Error in getUsersForSidebar: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};
