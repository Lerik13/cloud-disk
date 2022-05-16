const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
	if (req.method === 'OPTIONS') {
		return next()
	}
	
	let token;

	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		try {
			// Get token from header
			token = req.headers.authorization.split(' ')[1]
			// Verify token
			const JWT_SECRET = process.env.JWT_SECRET || config.get("secretKey")
			const decoded = jwt.verify(token, JWT_SECRET)
			
			// Get user from token
			//req.user  = await User.findById(decoded.id).select('-password')
			req.user = decoded
		
			next()
		} catch(e) {
			return res.status(401).json({message: 'Not authorized'})
		}
	}
	if (!token) {
		res.status(401).json({message: 'Not authorized'})
	}
}
