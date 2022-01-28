import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Input from '../../utils/input/Input';
import './registration.css';
import { login } from '../../actions/user';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useDispatch()

	return (
		<div className='authorization'>
			<div className='authorization__header'>Login</div>
			<Input value={email} setValue={setEmail} type="text" placeholder="Input email..." />
			<Input value={password} setValue={setPassword} type="password" placeholder="Input password..." />
			<button className='authorization__btn' onClick={() => dispatch(login(email, password))}>Enter</button>
		</div>
	);
};

export default Login;