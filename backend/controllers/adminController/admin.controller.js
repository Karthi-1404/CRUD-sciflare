import Organization from "../../models/Organization.model.js";
import User from "../../models/user.model.js";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";


export const getAllOrganization = async (req, res) => {
	try {
        console.log(req.query.page,req.query.limit);
        let skip = (req.query.page - 1) * req.query.limit
       let organizations = await Organization.find({}).skip(skip).limit(req.query.limit);
	   const organizationscount = await Organization.find({}).count()
	   let totalPage
       if(organizationscount > req.query.limit){
		   totalPage = Math.ceil(organizationscount / req.query.limit)// Math.round(10/req.query.limit)
	   }else{
		totalPage = 1
	   }
       res.success({organizations,totalPage})
	} catch (error) {
		res.status(500).json({ error: "Internal Server Error" });
	}
};
export const createOrganization = async (req, res) => {
	try {
        const body = req.body ? req.body.organization: res.serverError(400,'No request body')
        const checkOrg = await Organization.findOne({orgName:body.orgName})
        if(checkOrg) 
            return res.serverError(400, 'Organization already added');
       const newOrganization = new Organization(body);

      const savedOrganization = await newOrganization.save();
       res.success({Organization:savedOrganization.toJSON()})
	} catch (error) {
		res.status(500).json({ error: "Internal Server Error" });
	}
};
export const updateOrganization = async (req, res) => {
	try {
        const id = req.params.id
        const checkOrg = await Organization.findOne({_id:id})
        if(!checkOrg) res.status(500).json({ error: "Organization not found" });
       const updateOrganization = await Organization.findOneAndUpdate({_id:id},req.body.organization,{ new: true })

       res.success({Organization:updateOrganization.toJSON()})
	} catch (error) {
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const deleteOrganization = async (req, res) => {
	try {
        const id = req.params.id
        const checkOrg = await Organization.findOne({_id:id})
        if(!checkOrg) res.status(500).json({ error: "Organization not found" });
       const deleted = await Organization.findOneAndDelete({_id:id})
       if(deleted)
            res.success({message:'organization successfully deleted'})
        else
           res.success({message:'not deleted'})  
	} catch (error) {
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const getAllUser = async (req, res) => {
	try {
        console.log(req.query.page,req.query.limit);
        let skip = (req.query.page - 1) * req.query.limit
       const users = await User.find({}).populate('organization').skip(skip).limit(req.query.limit);
	   const userscount = await User.find({}).count()
	   let totalPage
       if(userscount > req.query.limit){
		   totalPage = Math.ceil(userscount / req.query.limit)// Math.round(10/req.query.limit)
	   }else{
		  totalPage = 1
	   }
       res.success({users,totalPage})
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
export const createUser = async (req, res) => {
	try {
        let body = req.body ? req.body.user: res.serverError(400,'No request body')
        if (body.password !== body.confirmPassword) {
			return res.status(400).json({ error: "Passwords don't match" });
		}

		const user = await User.findOne({ email:body.email });

		if (user) {
			return res.status(400).json({ error: "email already exists" });
		}

		// HASH PASSWORD HERE
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(body.password, salt);
        const ObjectIdd= new mongoose.Types.ObjectId('65ef8b09f3225078a2170e1e')
		const newUser = await new User({
			fullName:body.fullName,
			email:body.email,
			password: hashedPassword,
			gender:body.gender,
			role:body.role,
            organization:ObjectIdd
		}).save()
       res.success({user:newUser.toJSON()})
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
export const updateUser = async (req, res) => {
	try {
        const id = req.params.id
        const checkUser = await User.findOne({_id:id})
        if(!checkUser) res.status(500).json({ error: "User not found" });
       const updateUser = await User.findOneAndUpdate({_id:id},req.body.user,{ new: true })

       res.success({user:updateUser.toJSON()})
	} catch (error) {
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const deleteUser = async (req, res) => {
	try {
        const id = req.params.id
        const checkUser = await User.findOne({_id:id})
        if(!checkUser) res.status(500).json({ error: "User not found" });
       const deleted = await User.findOneAndDelete({_id:id})
       if(deleted)
            res.success({message:'user successfully deleted'})
        else
           res.success({message:'not deleted'})  
	} catch (error) {
		res.status(500).json({ error: "Internal Server Error" });
	}
};