const fs = require('fs') // File System
const File = require('../models/File')
const config = require('config')

class FileService {

	createDir(req, file) {
		//const filePath = `${config.get('filePath')}\\${file.user}\\${file.path}`
		const filePath = this.getPath(req, file)

		return new Promise(((resolve, reject) => {
			try {
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
		//console.log('path = '+ path);

		if (file.path === 'dir') {
			fs.rmdirSync(path)
		} else {
			fs.unlinkSync(path)
		}
	}
	
	getPath(req, file) {
		return req.filePath  + '\\' + file.user +'\\'+ file.path
	}
}

module.exports = new FileService()