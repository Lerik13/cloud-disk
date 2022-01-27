import React, { useState } from 'react';
import { registration } from '../../actions/user';
import Input from '../../utils/input/Input';
import './registration.css';

const Registration = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	return (
		<div className='registration'>
			<div className='registration__header'>Registration</div>
			<Input value={email} setValue={setEmail} type="text" placeholder="Input email..." />
			<Input value={password} setValue={setPassword} type="password" placeholder="Input password..." />
			<button className='registration__btn' onClick={() => registration(email, password)}>Enter</button>
		</div>
	);
};

export default Registration;