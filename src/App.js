import "./App.css";
import { Route, Routes } from "react-router-dom";
import { SignUp } from "./components/SignUp/SignUp";
import { SignIn } from "./components/SignIn/SignIn";
import Home from "./components/Home/Home";

function App() {
	return (
		<div className='App'>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/sign-up' element={<SignUp />} />
				<Route path='/sign-in' element={<SignIn />} />
			</Routes>
		</div>
	);
}

export default App;
