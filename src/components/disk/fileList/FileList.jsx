import React from 'react';
import './fileList.css'
import {useSelector} from 'react-redux'
import File from './file/File'

const FileList = () => {

	const files = useSelector(state => state.files.files).map(file => <File key={file._id} file={file} />)
	//const files = [ {_id:1, name: 'dir1', type: 'dir', size: '5gb', date: '01.02.2021'},
	//				{_id:2, name: 'file1', type: 'file', size: '6gb', date: '02.02.2021'}].map(file => <File file={file} key={file.id}/>)


	return (
		<div className='filelist'>
			<div className='filelist__header'>
				<div className='filelist__name'>Name</div>
				<div className='filelist__date'>Date</div>
				<div className='filelist__size'>Size</div>
			</div>
			{files}
		</div>
	);
};

export default FileList;