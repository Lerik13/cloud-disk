const fs = require('fs') // File System
const File = require('../models/File')
const config = require('config')

class FileService {

	createDir(req, file) {
		const filePath = this.getPath(req, file)

		return new Promise(((resolve, reject) => {
			try {
				// invoke code in synchronous mode for executing code one-by-one
				if (!fs.existsSync(filePath)) {
					fs.mkdirSync(filePath)
					return resolve({message: 'File was created'})
				} else {
					return reject({message: 'File already exist'})
				}
			} catch (e) {
				return reject({message: 'File error'})
			}
		}))
	}

	deleteFile(req, file) {
		const path = this.getPath(req, file)

		if (file.type === 'dir') {
			fs.rmdirSync(path)
		} else {
			fs.unlinkSync(path)
		}
	}
	
	getPath(req, file) {
		return req.filePath  + '\\' + String(file.user) +'\\'+ file.path
	}
}

module.exports = new FileService()