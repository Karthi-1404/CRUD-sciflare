import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import passport from 'passport';

export const signup = async (req, res) => {
	try {
		const { fullName, email, password, confirmPassword, gender,role } = req.body;

		if (password !== confirmPassword) {
			return res.status(400).json({ error: "Passwords don't match" });
		}

		const user = await User.findOne({ email });

		if (user) {
			return res.status(400).json({ error: "Username already exists" });
		}

		// HASH PASSWORD HERE
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = new User({
			fullName,
			email,
			password: hashedPassword,
			gender,
			role
		});

		if (newUser) {
			// Generate JWT token here
			await newUser.save();

			res.status(201).json({
				_id: newUser._id,
				fullName: newUser.fullName,
				username: newUser.username
			});
		} else {
			res.status(400).json({ error: "Invalid user data" });
		}
	} catch (error) {
		console.log("Error in signup controller", error.message);
		res.status(500).json({ error: error.message});
	}
};

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

		if (!user || !isPasswordCorrect) {
			return res.status(400).json({ error: "Invalid username or password" });
		}

		passport.authenticate('local', async (err, data) => {
			console.log('err, data',err, data);
			if (err) {
				console.log('err - ');
				console.log(err.message);
				return res.send({
					success:false,
					message:err.message
			// return res.success(data);
		})
			}
			console.log('data',data);
			delete data.user._doc.password
			res.send({
					success:true,
					message:'successfully Logged IN',
					user:{...data.user._doc,
						token:data.token}
			// return res.success(data);
		})
		})(req, res);

	} catch (error) {
		console.log("Error in login controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const logout = (req, res) => {
	try {
		res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};
