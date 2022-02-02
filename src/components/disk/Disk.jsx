import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {getFiles} from '../../actions/file'
import './disk.css'
import FileList from "./fileList/FileList"

const Disk = () => {
	const dispatch = useDispatch()
	const currentDir = useSelector(state => state.files.currentDir)

	useEffect(() => {
		dispatch(getFiles(currentDir))
	}, [currentDir])

	return (
		<div className="disk">
			<div className="disk__btns">
				<button className='disk__back'>Back</button>
				<button className='disk__create'>Create Dir</button>
			</div>
			<FileList/>
		</div>
	);
};

export default Disk;