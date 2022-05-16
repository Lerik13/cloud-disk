import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAvatar, uploadAvatar, changeName } from '../../actions/user';
import Input from '../../utils/input/Input';
import './profile.css';

const Profile = () => {
	const currentUser = useSelector(state => state.user.currentUser)
	const [name, setName] = useState('');
	const dispatch = useDispatch()
	
	useEffect(() => {
		if (currentUser?.name) {
			setName(currentUser.name)
		}
	}, [])

	function changeHandler(e) {
		const file = e.target.files[0]
		dispatch(uploadAvatar(file))
	}

	return (
		<div className='profile'>
			<div className='profile__content'>
				<h2 className='profile__header'>User's Profile page</h2>
				<div className='profile__body'>
					<div className='profile__name'>
						<span className='profile__name-label'>Name: </span>
						<Input value={name} setValue={setName} type="text" placeholder="Input user name..." />
						<button onClick={() => dispatch(changeName(name))} className="profile__btn">Change</button>
					</div>
					<div className='profile__avatar'>
						Avatar:
						<button onClick={() => dispatch(deleteAvatar())} className="profile__btn">Delete</button>
						<input accept="image/*" onChange={(e) => changeHandler(e)} type="file" placeholder="Upload avatar" className="profile__file"/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;