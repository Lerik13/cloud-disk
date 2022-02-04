import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import './file.css'
import dirIcon from '../../../../assets/img/dir.svg'
import fileIcon from '../../../../assets/img/file.svg'
import { pushToStack, setCurrentDir } from '../../../../reducers/fileReducer';


const File = ({file}) => {
	const dispatch = useDispatch();
	const currentDir = useSelector(state => state.files.currentDir)

	function OpenDirHandler(file) {
		if (file.type === 'dir') {
			dispatch(pushToStack(currentDir))
			dispatch(setCurrentDir(file._id))
		}
	}

	return (
		<div className='file' onClick={() => OpenDirHandler(file)}>
			<img src={file.type === 'dir' ? dirIcon : fileIcon} alt="" className='file__img' />
			<div className='file__name'>{file.name}</div>
			<div className='file__date'>{file.date.slice(0,10)}</div>
			<div className='file__size'>{file.size}</div>
		</div>
	);
};

export default File;