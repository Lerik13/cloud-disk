const fileService = require('../services/fileService')
const config = require('config')
const fs = require('fs') // work with FileSystem
const User = require('../models/User')
const File = require('../models/File')
const Uuid = require('uuid')

const STATIC_PATH = process.env.STATIC_PATH || config.get('staticPath')

class FileController {
	async createDir(req, res) {
		try {
			const {name, type, parent} = req.body
			const file = new File({name, type, parent, user: req.user.id})
			const parentFile = await File.findOne({_id: parent})
			
			if (!parentFile) {
				file.path = name
				await fileService.createDir(req, file)
			} else {
				file.path = `${parentFile.path}\\${file.name}`
				await fileService.createDir(req, file)
				parentFile.childs.push(file._id)
				await parentFile.save()
			}
			await file.save()
			return res.json(file)
		} catch (e) {
			console.log(e);
			return res.status(400).json(e)
		}
	}

	async getFiles(req, res) {
		try {
			const {sort} = req.query;
			let files;
			
			switch (sort) {
				case 'name':
					// sort (2nd argument: sort direction: 1=asc, -1=desd)
					files = await File.find({user: req.user.id, parent: req.query.parent}).sort({ name: 1 })
					break
				case 'type':
					files = await File.find({user: req.user.id, parent: req.query.parent}).sort({ type: 1 })
					break
				case 'date':
					files = await File.find({user: req.user.id, parent: req.query.parent}).sort({ date: 1 })
					break
				default:
					files = await File.find({user: req.user.id, parent: req.query.parent})
					break
			}
			return res.json(files)
		} catch (e) {
			console.log(e);
			return res.status(500).json({message: "Cannot get files"})
		}
	}

	async uploadFile(req, res) {
		try {
			const file = req.files.file

			const parent = await File.findOne({user: req.user.id, _id: req.body.parent})
			const user = await User.findOne({_id: req.user.id})

			if (user.usedSpace + file.size > user.diskSpace) {
				return res.status(400).json({message: "There are no space on the disk"})
			}

			user.usedSpace = user.usedSpace + file.size

			let path;
			if (parent) {
				path = `${req.filePath}\\${user._id}\\${parent.path}\\${file.name}`
			} else {
				path = `${req.filePath}\\${user._id}\\${file.name}`
			}

			if (fs.existsSync(path)) {
				return res.status(400).json({message: "File already exist"})
			}

			await file.mv(path)  //Move file to path (express-fileupload)

			const type = file.name.split('.').pop()

			//let filePath = parent?.path
			let filePath = file.name
			if (parent) {
				filePath = parent.path + "\\" + file.name
			}

			const dbFile = new File({
				name: file.name,
				type,
				size: file.size,
				path: filePath,
				parent: parent ? parent._id : null,
				user: user._id
			})

			await dbFile.save()
			await user.save()

			res.json(dbFile)

		} catch(e) {
			console.log(e);
			return res.status(500).json({message: "Upload error"})
		}
	}

	async downloadFile(req, res) {
		try {
			const file = await File.findOne({_id: req.query.id, user: req.user.id}) 
			const path = fileService.getPath(req, file)

			if (fs.existsSync(path)) {
				return res.download(path, file.name)
			}
			return res.status(400).json({message: "Download error"})
		} catch (e) {
			console.log(e);
			res.status(500).json({message: "Download error"})
		}
	}

	async deleteFile(req, res) {
		try {
			const file = await File.findOne({_id: req.query.id, user: req.user.id})
			if (!file) {
				return res.status(400).json({message: 'File not found in BD'})
			}
			
			if (!fs.existsSync(fileService.getPath(req, file))) {
				await file.remove()		// delete data from DB = cleaning up inconsistencies
				return res.json({message: 'File not found'})
			}
			
			fileService.deleteFile(req, file) // physical file removal
			await file.remove()			 	  // delete data from DB
			return res.json({message: 'File was deleted'})
		} catch(e) {
			console.log(e);
			console.log(e.message);
			return res.status(400).json({message: 'Directory is not empty'})
		}
	}

	async searchFile(req, res) {
		try {
			const searchName = req.query.search
			let files = await File.find({user: req.user.id})
			files = files.filter(file => file.name.includes(searchName))
			return res.json(files)

		} catch(e) {
			console.log(e);
			return res.status(400).json({message: 'Search error'})
		}
	}

	async uploadAvatar(req, res) {
		try {
			const file = req.files.file;
			const user = await User.findById(req.user.id)
			const avatarName = Uuid.v4() + ".jpg"

			// remove old avatar file
			if (user.avatar !== null) {
				if (fs.existsSync(STATIC_PATH +"\\"+ user.avatar)) {
					fs.unlinkSync(STATIC_PATH +"\\"+ user.avatar)
				}
			}

			// upload new file
			file.mv(STATIC_PATH +"\\"+ avatarName)
			user.avatar = avatarName

			await user.save()
			return res.json(user)

		} catch(e) {
			console.log(e);
			return res.status(400).json({message: 'Upload avatar error'})
		}
	}
	async deleteAvatar(req, res) {
		try {
			const user = await User.findById(req.user.id)
			fs.unlinkSync(STATIC_PATH +"\\"+ user.avatar)
			user.avatar = null
			await user.save()
			return res.json(user)

		} catch(e) {
			console.log(e);
			return res.status(400).json({message: 'Delete avatar error'})
		}
	}
}

module.exports = new FileController()