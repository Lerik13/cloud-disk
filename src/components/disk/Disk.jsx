import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {getFiles, uploadFile} from '../../actions/file'
import { setCurrentDir, setPopupDisplay } from '../../reducers/fileReducer';
import './disk.css'
import FileList from "./fileList/FileList"
import Popup from "./Popup"

const Disk = () => {
	const dispatch = useDispatch()
	const currentDir = useSelector(state => state.files.currentDir)
	const dirStack = useSelector(state => state.files.dirStack)
	const [dragEnter, setDragEnter] = useState(false)

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

	function fileUploadHandler(event) {
		const files = [...event.target.files]
		files.forEach(file => dispatch(uploadFile(file, currentDir)))
	}

	function dragEnterHandler(event) {
		event.preventDefault()
		event.stopPropagation()
		setDragEnter(true)
	}
	function dragLeaveHandler(event) {
		event.preventDefault()
		event.stopPropagation()
		setDragEnter(false)
	}

	function dropHandler(event) {
		event.preventDefault()
		event.stopPropagation()
		let files = [...event.dataTransfer.files]
		files.forEach(file => dispatch(uploadFile(file, currentDir)))
		setDragEnter(false)
	}

	return ( !dragEnter ?
		<div className="disk" onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
			<div className="disk__btns">
				
				{currentDir && <button className="btn disk__back" onClick={()=> backClickHandler()}>&larr; Back</button>}
				<button className='btn disk__create' onClick={() => showPopupHandler()}>Create Folder</button>
				<div className='disk__upload'>
					<label htmlFor="disk__upload-input" className='btn disk__upload-label'>Upload file</label>
					<input multiple={true} onChange={(event) => fileUploadHandler(event)} type="file" id='disk__upload-input' className='disk__upload-input' />
				</div>
			</div>
			<FileList/>
			<Popup />
		</div>
		:
		<div className='drop-area' onDrop={dropHandler} onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
			Drag and Drop files
		</div>
	);
};

export default Disk;