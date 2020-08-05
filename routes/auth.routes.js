const {Router} = require('express')
const {check, validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../models/User')

const router = Router()
router.post(
    '/register',
    [
        check('email', 'Incorrect email').isEmail(),
        check('password', 'Min password length is 8 symbols').isLength({min: 8})
    ],
    async (request, response) => {
    try {
        const errors = validationResult(request)
        if(!errors.isEmpty())
            return response.status(400).json({
                errors: errors.array(),
                message: 'Incorrect registration data'
            })

        const {email, password} = request.body
        const candidate = await User.findOne({email: email})
        if(candidate)
            return response.status(400).json({message: `Email already registered`})
        const passwordHash = await bcrypt.hash(password, 12)
        const user = new User({email: email, passwordHash: passwordHash})
        await user.save()
        return response.status(201).json({message: `User ${email} created`})
    } catch (e) {
        response.status(500).json({message:`Something went wrong ${e.message}`})
    }
})
router.post(
    '/login',
    [
        check('email', 'Incorrect email').normalizeEmail().isEmail(),
        check('password', 'Input password').exists()
    ],
    async (request, response) => {
        try {
            const errors = validationResult(request)
            if(!errors.isEmpty())
                return response.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect login data'
                })

            const {email, password} = request.body
            const user = await User.findOne({email: email})
            if(!user)
                return response.status(400).json({message: 'No user found'})
            const passwordMatch = await bcrypt.compare(password, user.passwordHash)
            if(!passwordMatch)
                return response.status(400).json({message: 'Incorrect password'})
            const token = jwt.sign(
                {userId: user.id},
                config.get('jwtSecret'),
                { expiresIn: '1h' }
            )
            return response.json({token: token, userId: user.id})

        } catch (e) {
            response.status(500).json({message:`Something went wrong ${e.message}`})
        }
})

module.exports = router
