import React, { useState } from 'react';
import { registration } from '../../actions/user';
import Input from '../../utils/input/Input';
import './registration.css';

const Registration = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const clickHandler = () => {
		registration(email, password, name)
	}

	return (
		<div className='authorization'>
			<div className='authorization__header'>Registration</div>
			<Input value={name} setValue={setName} type="text" placeholder="Input user name..." />
			<Input value={email} setValue={setEmail} type="text" placeholder="Input email..." />
			<Input value={password} setValue={setPassword} type="password" placeholder="Input password..." />
			<button className='authorization__btn' onClick={clickHandler}>Register</button>
		</div>
	);
};

export default Registration;