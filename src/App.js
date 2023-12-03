import "./App.css";
import { Route, Routes } from "react-router-dom";
import { SignUp } from "./pages/SignUp/SignUp";
import { SignIn } from "./pages/SignIn/SignIn";
import Home from "./pages/Home/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/Layout/Layout";
import ManageAccount from "./pages/ManageAccount/ManageAccount";

function App() {
	return (
		<div className='App'>
			<ToastContainer theme='colored' />
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route path='' element={<Home />} />
					<Route path='manage-account' element={<ManageAccount />} />
				</Route>
				<Route path='/sign-up' element={<SignUp />} />
				<Route path='/sign-in' element={<SignIn />} />
			</Routes>
		</div>
	);
}

export default App;
