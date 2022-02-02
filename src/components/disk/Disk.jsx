import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {getFiles} from '../../actions/file'
import { setPopupDisplay } from '../../reducers/fileReducer';
import './disk.css'
import FileList from "./fileList/FileList"
import Popup from "./Popup"

const Disk = () => {
	const dispatch = useDispatch()
	const currentDir = useSelector(state => state.files.currentDir)

	useEffect(() => {
		dispatch(getFiles(currentDir))
	}, [currentDir])

	function showPopupHandler() {
		dispatch(setPopupDisplay('flex'))
	}

	return (
		<div className="disk">
			<div className="disk__btns">
				<button className='disk__back'>Back</button>
				<button className='disk__create' onClick={() => showPopupHandler()}>Create Folder</button>
			</div>
			<FileList/>
			<Popup />
		</div>
	);
};

export default Disk;