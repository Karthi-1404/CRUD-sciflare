import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import Organization from "./pages/organization/Organization.jsx";
import User from "./pages/users/users.jsx";
import HeaderRoute from "./components/header/header.jsx";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";

function App() {
	const { authUser } = useAuthContext();
	return (
		<div className=''>
			<Routes>
				<Route path='/' element={authUser ? <Home />: <Navigate to={"/login"} />} />
				<Route path='/alluser' element={authUser ? <User />: <Navigate to={"/login"} />} />
				<Route path='/allOrganization' element={authUser ? <Organization />: <Navigate to={"/login"} />} />
				<Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />} />
				<Route path='/signup' element={authUser ? <Navigate to='/' /> : <SignUp />} />
			</Routes>
			<Toaster />
		</div>
	);
}

export default App;
