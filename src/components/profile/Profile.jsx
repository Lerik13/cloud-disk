import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteAvatar, uploadAvatar } from '../../actions/user';
import './profile.css';

const Profile = () => {
	const dispatch = useDispatch()
	
	function changeHandler(e) {
		const file = e.target.files[0]
		dispatch(uploadAvatar(file))
	}

	return (
		<div className='profile'>
			<div className='profile__content'>
				<h2 className='profile__header'>User's Profile page</h2>
				<div className='profile__body'>
					<button onClick={() => dispatch(deleteAvatar())} className="profile__btn-delete">Delete avatar</button>
					<input accept="image/*" onChange={(e) => changeHandler(e)} type="file" placeholder="Upload avatar" className="profile__file"/>
				</div>
			</div>
		</div>
	);
};

export default Profile;