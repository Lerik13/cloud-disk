import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import './file.css'
import dirIcon from '../../../../assets/img/dir.svg'
import fileIcon from '../../../../assets/img/file.svg'
import { pushToStack, setCurrentDir, setCurrentPath } from '../../../../reducers/fileReducer';
import { deleteFile, downloadFile } from '../../../../actions/file';
import deleteIcon from '../../../../assets/img/delete.svg'
import downloadIcon from '../../../../assets/img/download.svg'
import sizeFormat from '../../../../utils/sizeFormat';

const File = ({file}) => {
	const dispatch = useDispatch();
	const currentDir = useSelector(state => state.files.currentDir)
	const fileView = useSelector(state => state.files.view)

	function OpenDirHandler(file) {
		if (file.type === 'dir') {
			dispatch(pushToStack(currentDir))
			dispatch(setCurrentDir(file._id))
			dispatch(setCurrentPath(file.path))
		}
	}

	function downloadClickHandler(e) {
		e.stopPropagation()
		downloadFile(file)
	}

	function deleteClickHandler(e){
		e.stopPropagation()
		dispatch(deleteFile(file))
	}

	if (fileView === 'list') {
		return (
			<div className='file' onClick={() => OpenDirHandler(file)}>
				<img src={file.type === 'dir' ? dirIcon : fileIcon} alt="" className='file__img' />
				<div className='file__name'>{file.name}</div>
				<div className='file__date'>{file.date.slice(0,10)}</div>
				<div className='file__size'>{(file.type !== 'dir') && sizeFormat(file.size)}</div>
				{file.type !== 'dir' && <button onClick={(e) => downloadClickHandler(e)} className="file__btn file__download"><img src={downloadIcon} alt="Download" /></button>}
				<button onClick={(e) => deleteClickHandler(e)} className="file__btn file__delete"><img src={deleteIcon} alt="Delete" /></button>
			</div>
		);
	}
	if (fileView === 'plate') {
		return (
			<div className='file-plate' onClick={() => OpenDirHandler(file)}>
				<img src={file.type === 'dir' ? dirIcon : fileIcon} alt="" className='file-plate__img' />
				<div className='file-plate__name'>{file.name}</div>
				<div className='file-plate__btns'>
					<button onClick={(e) => deleteClickHandler(e)} className="file-plate__btn file-plate__delete"><img src={deleteIcon} alt="Delete" /></button>
					{file.type !== 'dir' && <button onClick={(e) => downloadClickHandler(e)} className="file-plate__btn file-plate__download"><img src={downloadIcon} alt="Download" /></button>}
				</div>
			</div>
		);
	}

};

export default File;