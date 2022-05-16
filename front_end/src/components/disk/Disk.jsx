import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {getFiles, uploadFile} from '../../actions/file'
import { setCurrentDir, setPopupDisplay, setCurrentPath, setFileView } from '../../reducers/fileReducer';
import './disk.css'
import FileList from "./fileList/FileList"
import Popup from "./Popup"
import Uploader from './uploader/Uploader';
import backIcon from '../../assets/img/back.svg'
import sortIcon from '../../assets/img/sort.svg'

const Disk = () => {
	const dispatch = useDispatch()
	const currentDir = useSelector(state => state.files.currentDir)
	const currentPath = useSelector(state => state.files.currentPath)
	const loader = useSelector(state => state.app.loader)
	const dirStack = useSelector(state => state.files.dirStack)
	const [dragEnter, setDragEnter] = useState(false)
	const [sort, setSort] = useState('type')

	useEffect(() => {
		dispatch(getFiles(currentDir, sort))
	}, [currentDir, sort])

	function showPopupHandler() {
		dispatch(setPopupDisplay('flex'))
	}

	function backClickHandler() {
		const backDirId = dirStack.pop()
		dispatch(setCurrentDir(backDirId))
		
		const prevPath = currentPath.substr(0, currentPath.lastIndexOf("\\"))
		dispatch(setCurrentPath(prevPath))
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

	if (loader) {
		return (
			<div className='loader'>
				<div className="lds-dual-ring"></div>
			</div>
		)
	}

	return ( !dragEnter ?
		<div className="disk" onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>

			<div className='disk__path'>{currentPath}</div>

			<div className="disk__btns">
				{/*currentDir && <button className="btn disk__back" onClick={()=> backClickHandler()}>&larr; Back</button>*/}
				{currentDir && <button className="btn disk__back" onClick={()=> backClickHandler()}><img src={backIcon} alt="Go Back" /></button>}
				<div className="disk__folder">
					<button className='btn disk__folder-create' onClick={() => showPopupHandler()}>Create Folder</button>
					<div className='disk__folder-upload'>
						<label htmlFor="disk__upload-input" className='btn disk__upload-label'>Upload file</label>
						<input multiple={true} onChange={(event) => fileUploadHandler(event)} type="file" id='disk__upload-input' className='disk__upload-input' />
					</div>
				</div>
				<div className='disk__sort'>
					<span className='disk__sort-caption'>
						<img src={sortIcon} alt="Sort:" />
					</span>
					<select value={sort} 
							onChange={(e) => setSort(e.target.value)}
							className='disk__sort-select'>
						<option value='name'>Name</option>
						<option value='type'>Type</option>
						<option value='date'>Date</option>
					</select>
					<button className='disk__plate' onClick={() => dispatch(setFileView('plate'))} />
					<button className='disk__list' onClick={() => dispatch(setFileView('list'))} />
				</div>	
			</div>
			<FileList/>
			<Popup />
			<Uploader />
		</div>
		:
		<div className='drop-area' onDrop={dropHandler} onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
			Drag and Drop files
		</div>
	);
};

export default Disk;