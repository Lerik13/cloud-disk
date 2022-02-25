import { useEffect } from "react";
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import './app.css';
import Navbar from "./navbar/Navbar";
import Registration from "./authorization/Registration";
import Login from "./authorization/Login";
import Disk from "./disk/Disk";
import Profile from "./profile/Profile";
import { auth } from "../actions/user";

function App() {
	const isAuth = useSelector(state => state.user.isAuth)
	const dispatch = useDispatch()

	useEffect(() => {
		if (localStorage.getItem('token')) {
			dispatch(auth())
		}
	}, []);

	return (
		<BrowserRouter>
			<div className='app'>
				<Navbar />
				<div className="wrap">
					{!isAuth ? 
						<Routes>
							<Route path="/registration" element={<Registration />} />
							<Route path="/login" element={<Login />} />
							<Route path="*" element={<Navigate to="/login" />} />
						</Routes>
						:
						<Routes>
							<Route path="/" element={<Disk />} />
							<Route path="/profile" element={<Profile />} />
							<Route path="*" element={<Navigate to="/" />} />
						</Routes>
					}
				</div>
			</div>
		</BrowserRouter>
	);
}

export default App;
