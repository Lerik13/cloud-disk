const User = require("../models/User");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken")
const {check, validationResult} = require("express-validator");
const fileService = require('../services/fileService')
const File = require('../models/File')

class AuthController {

	async registerUser(req, res) {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				let strError = ''
				errors.errors.map(error => (strError += (strError === '') ? error.msg : ', '+error.msg ));
				return res.status(400).json({message: "Incorrect request: " + strError})
			}
	
			const {email, password, name} = req.body
	
			const candidate = await User.findOne({email})
	
			if (candidate) {
				return res.status(400).json({message: `User with email ${email} already exist`})
			}
	
			const hashPassword = await bcrypt.hash(password, 8)
			const user = new User({email, password: hashPassword, name})
			await user.save()
			
			// Create folder for new user
			await fileService.createDir(req, new File({user: user.id, name: ''}))
			
			return res.json({message: "User was created"})
	
		} catch(e) {
			console.log(e)
			res.send({message: "Server error"})
		}
	}

	async loginUser(req, res) {
		try {
			const {email, password} = req.body
			const user = await User.findOne({email})
			if (!user) {
				return res.status(404).json({message: "User not found"})
			}
			const isPassValid = bcrypt.compareSync(password, user.password)
			if (!isPassValid) {
				return res.status(400).json({message: "Invalid password"})
			}
			const JWT_SECRET = process.env.JWT_SECRET || config.get("secretKey")
			const token = jwt.sign({id: user.id}, JWT_SECRET, {expiresIn: "1h"})
			return res.json({
				token,
				user: {
					id: user.id,
					email: user.email,
					name: user.name,
					diskSpace: user.diskSpace,
					userSpace: user.usedSpace,
					avatar: user.avatar
				}
			})
		} catch(e) {
			console.log(e)
			res.send({message: "Server error"})
		}
	}

	async checkAuth(req, res) {
		try {
			const user = await User.findOne({_id: req.user.id})
			const JWT_SECRET = process.env.JWT_SECRET || config.get("secretKey")
			const token = jwt.sign({id: user.id}, JWT_SECRET, {expiresIn: "1h"})
			return res.json({
				token,
				user: {
					id: user.id,
					email: user.email,
					name: user?.name,
					diskSpace: user.diskSpace,
					userSpace: user.usedSpace,
					avatar: user.avatar
				}
			})
		} catch(e) {
			console.log(e)
			res.send({message: "Server error"})
		}
	}

	async changeUsername(req, res) {
		try {
			const {name} = req.body

			if (!name) {
				res.status(400)
				throw new Error('Please add name')
			}

			// get user using Id in the JWT
			const user = await User.findOne({_id: req.user.id})

			if (!user) {
				res.status(401)
				throw new Error('User not found')
			}
			
			user.name = name;
			await user.save()
			
			const JWT_SECRET = process.env.JWT_SECRET || config.get("secretKey")
			const token = jwt.sign({id: user.id}, JWT_SECRET, {expiresIn: "1h"})
			return res.json({
				token,
				user: {
					id: user.id,
					email: user.email,
					name: user.name,
					diskSpace: user.diskSpace,
					userSpace: user.usedSpace,
					avatar: user.avatar
				}
			})
			//return res.json(user)

		} catch(e) {
			console.log(e)
			res.send({message: "Server error"})
		}
	}
}

module.exports = new AuthController()