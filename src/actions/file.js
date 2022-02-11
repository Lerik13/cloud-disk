import axios from 'axios'
import {setFiles, addFile, deleteFileAction} from '../reducers/fileReducer'
import { addUploadFile, changeUploadFile, removeUploadFile, showUploader } from '../reducers/uploadReducer'

export function getFiles(dirId) {
	return async dispatch => {
		try {
			const response = await axios.get(`http://localhost:5000/api/files${dirId ? '?parent='+dirId : ''}`, {
				headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
			})
			dispatch(setFiles(response.data))
			console.log(response.data)
		} catch (e) {
			alert(e.response.data.message)
		}
	}
}

export function createDir(dirId, name) {
	return async dispatch => {
		try {
			const response = await axios.post(`http://localhost:5000/api/files`, {
				name,
				parent: dirId,
				type: 'dir'
			}, {
				headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
			})
			dispatch(addFile(response.data))
			//console.log(response.data)
		} catch (e) {
			alert(e.response.data.message)
		}
	}
}

export function uploadFile(file, dirId) {
	return async dispatch => {
		try {
			const formData = new FormData()
			formData.append('file', file)
			if (dirId) {
				formData.append('parent', dirId)
			}
			
			const uploadFile = {name: file.name, progress: 0, id: Date.now() } //for Uploader
			dispatch(showUploader())
			dispatch(addUploadFile(uploadFile))

			const response = await axios.post(`http://localhost:5000/api/files/upload`, formData, {
				headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
				onUploadProgress: progressEvent => { // get size of file, using Header
					const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
					if (totalLength) {
						uploadFile.progress = Math.round( (progressEvent.loaded * 100) / totalLength )
						dispatch(changeUploadFile(uploadFile))
					}
				}
			})
			dispatch(addFile(response.data))
		} catch (e) {
			alert(e.response.data.message)
		}
	}
}

export async function downloadFile(file) {
	//console.log('downloadFile =', file)
	const response = await fetch(`http://localhost:5000/api/files/download?id=${file._id}`, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem('token')}`
		}
	})
	if (response.status === 200) {
		//console.log('after status 200');
		const blob = await response.blob() // ~ физич. ф-л объект, от сервера получаем ф-л в бинарном виде, нужно преобразовать в нормальный ф-л
		const downloadUrl = window.URL.createObjectURL(blob)
		const link = document.createElement('a');
		link.href = downloadUrl
		link.download = file.name
		document.body.appendChild(link)
		link.click()
		link.remove()
	}
}

export function deleteFile(file) {
	return async dispatch => {
		try {
			const response = await axios.delete(`http://localhost:5000/api/files?id=${file._id}`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`
				}
			})
			console.log('DELETE file in file.js: response: '+response)
			dispatch(deleteFileAction(file._id))
			alert(response.data.message)
			//console.log(response.data)
		} catch (e) {
			alert(e.response.data.message)
		}
	}
}