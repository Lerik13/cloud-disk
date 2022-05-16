import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createDir } from '../../actions/file';
import { setPopupDisplay } from '../../reducers/fileReducer';
import Input from "../../utils/input/Input";
//import './disk.css';

const Popup = () => {
	const [dirName, setDirName] = useState('')
	const popupDisplay = useSelector(state => state.files.popupDisplay)
	const currentDir = useSelector(state => state.files.currentDir)
	const dispatch = useDispatch();

	function createHandler() {
		dispatch(createDir(currentDir, dirName))
		setDirName('');
		dispatch(setPopupDisplay('none'))
	}

	return (
		<div className="popup" onClick={() => dispatch(setPopupDisplay('none'))} style={{display: popupDisplay}}>
			<div className="popup__content" onClick={(event) => event.stopPropagation()}>
				<div className="popup__header">
					<div className="popup__title">Create new folder</div>
					<button className="btn popup__close" onClick={() => dispatch(setPopupDisplay('none'))}>X</button>
				</div>
				<Input type="text" placeholder="Enter name of folder..." value={dirName} setValue={setDirName} />
				<button className="btn popup__create" onClick={() => createHandler()}>Create</button>
			</div>
		</div>
	);
};

export default Popup;