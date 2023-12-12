/** @format */

import './App.css';
import { Route, Routes } from 'react-router-dom';
import { SignUp } from './pages/SignUp/SignUp';
import { SignIn } from './pages/SignIn/SignIn';
import Board from './pages/Board/Board';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './components/Layout/Layout';
import ManageAccount from './pages/ManageAccount/ManageAccount';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Home from './pages/Home/Home';
import Loader from './pages/Loader';

function App() {
	return (
		<DndProvider backend={HTML5Backend}>
			<div className='App'>
				<ToastContainer theme='colored' />
				<Routes>
					<Route
						path='/'
						element={<Loader />}
					/>
					<Route
						path='/'
						element={<Layout />}>
						<Route
							path='board/:boardId'
							element={<Board />}
						/>
						<Route
							path='manage-account'
							element={<ManageAccount />}
						/>
						<Route
							path='/home'
							element={<Home />}
						/>
					</Route>
					<Route
						path='/sign-up'
						element={<SignUp />}
					/>
					<Route
						path='/sign-in'
						element={<SignIn />}
					/>
				</Routes>
			</div>
		</DndProvider>
	);
}

export default App;
