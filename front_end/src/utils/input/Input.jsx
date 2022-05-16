import React from 'react';
import "./input.css";

const Input = (props) => {
	return (
		<input 
			value={props.value} 
			onChange={(event) => props.setValue(event.target.value)} 
			type={props.type} 
			placeholder={props.placeholder} 
		/>
	);
};

export default Input;