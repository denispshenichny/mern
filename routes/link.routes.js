const {Router} = require('express')
const shortid = require('shortid')
const config = require('config')
const Link = require('../models/Link')
const auth = require('../middleware/auth.middleware')

const router = Router()

router.post(
    '/generate',
    auth,
    async (request, response) => {
        try {
            const baseUrl = config.get('baseUrl')
            const {from} = request.body
            const code = shortid.generate()
            const existing = await Link.findOne({ from })
            if(existing)
                return response.json({ link: existing })
            const to = baseUrl + '/t/' + code
            const link = new Link({
                code: code,
                from: from,
                to: to,
                owner: request.user.userId
            })
            await link.save()
            return response.status(201).json({ link })
        } catch (e) {
            response.status(500).json({message:`Something went wrong ${e.message}`})
        }
    }
)
router.get(
    '/',
    auth,
    async (request, response) => {
        try {
            const links = request.user.userId ? await Link.find({ owner: request.user.userId }) : []
            return response.json(links)
        } catch (e) {
            response.status(500).json({message:`Something went wrong ${e.message}`})
        }
    }
)
router.get(
    '/:id',
    auth,
    async  (request, response) => {
        try {
            const link = await Link.findById(request.params.id)
            return response.json(link)
        } catch (e) {
            response.status(500).json({message:`Something went wrong ${e.message}`})
        }
    }
)

module.exports = router
