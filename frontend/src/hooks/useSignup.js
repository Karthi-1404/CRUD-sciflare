import { useState } from "react";
import toast from "react-hot-toast";

const useSignup = () => {
	const [loading, setLoading] = useState(false);

	const signup = async ({ fullName, email, password, confirmPassword, gender,role }) => {
		const success = handleInputErrors({ fullName, email, password, confirmPassword, gender,role });
		if (!success) return;

		setLoading(true);
		try {
			const res = await fetch("/api/auth/signup", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ fullName, email, password, confirmPassword, gender,role }),
			});

			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}
			toast.success('account created successfully');
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, signup };
};
export default useSignup;

function handleInputErrors({ fullName, email, password, confirmPassword, gender }) {
	if (!fullName || !email || !password || !confirmPassword || !gender) {
		toast.error("Please fill in all fields");
		return false;
	}

	if (password !== confirmPassword) {
		toast.error("Passwords do not match");
		return false;
	}

	if (password.length < 6) {
		toast.error("Password must be at least 6 characters");
		return false;
	}

	return true;
}
