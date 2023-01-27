import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideUploader } from '../../../reducers/uploadReducer';
import './uploader.css';
import UploadFile from './UploadFile';

const Uploader = () => {
	//const files = [{id:1, name: "file1", progress:75}, {id:2, name: "file2", progress:0}]
	const files = useSelector(state => state.upload.files)
	const isVisible = useSelector(state => state.upload.isVisible)	
	const dispatch = useDispatch()

	return ( isVisible &&
		<div className='uploader'>
			<div className='uploader__header'>
				<div className='uploader__title'>Loading ...</div>
				<button className='uploader__close' onClick={() => dispatch(hideUploader())}>X</button>
			</div>
			{files.map(file => 
				<UploadFile key={file.id} file={file} />
			)}
		</div>
	);
};

export default Uploader;