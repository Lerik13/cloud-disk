import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {getFiles} from '../../actions/file'
import { popFromStack, setCurrentDir, setPopupDisplay } from '../../reducers/fileReducer';
import './disk.css'
import FileList from "./fileList/FileList"
import Popup from "./Popup"

const Disk = () => {
	const dispatch = useDispatch()
	const currentDir = useSelector(state => state.files.currentDir)
	const dirStack = useSelector(state => state.files.dirStack)

	useEffect(() => {
		dispatch(getFiles(currentDir))
	}, [currentDir])

	function showPopupHandler() {
		dispatch(setPopupDisplay('flex'))
	}

	function backClickHandler() {
		const backDirId = dirStack.pop()
		dispatch(setCurrentDir(backDirId))
	}

	return (
		<div className="disk">
			<div className="disk__btns">
				{currentDir && <button className="disk__back" onClick={()=> backClickHandler()}>Back</button>}
				<button className='disk__create' onClick={() => showPopupHandler()}>Create Folder</button>
			</div>
			<FileList/>
			<Popup />
		</div>
	);
};

export default Disk;