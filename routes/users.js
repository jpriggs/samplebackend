const express = require('express')
const router = express.Router()
const User = require('../models/users')

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (err) {
		res.status(500).json({ message: err.message })
    }
})

// Get one user
router.get('/:id', getUser, (req, res) => {
	res.json(res.user)
})

// Create one user
router.post('/', async (req, res) => {
	const user = new User({
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		email: req.body.email,
		created: req.body.created
	})

	try {
		const newUser = await user.save()
		res.status(201).json(newUser)
	} catch (err) {
		res.status(400).json({ message: err.message })
	}
})

// Update one user
router.patch('/:id', getUser, async (req, res) => {
	if (req.body.first_name !== null) {
		res.user.first_name = req.body.first_name
	}
	if (req.body.last_name !== null) {
		res.user.last_name = req.body.last_name
	}
	if (req.body.email !== null) {
		res.user.email = req.body.email
	}
	try {
		const updatedUser = await res.user.save()
		res.json(updatedUser)
	} catch (err) {
		res.status(400).json({ message: err.message })
	}
})

// Delete one user
router.delete('/:id', getUser, async (req, res) => {
	try {
		await res.user.remove()
		res.json({ message: `Deleted user ${ res.user.first_name } ${ res.user.last_name }` })
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
})

async function getUser(req, res, next) {
	let user
	try {
		user = await User.findById(req.params.id)
		if (user === null) {
			return res.status(404).json({ message: 'Cant find user' })
		}
	} catch (err) {
		return res.status(500).json({ message: err.message })
	}

	res.user = user
	next()
}

module.exports = router