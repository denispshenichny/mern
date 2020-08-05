const {Router} = require('express')
const Link = require('../models/Link')
const router = Router()

router.get(
    '/:code',
    async (request, response) => {
        try {
            const link = await Link.findOne({code: request.params.code})
            if(!link)
                return response.status(404).json({message: `Link ${code} not found`})
            link.clicks++
            await link.save()
            return response.redirect(link.from)
        } catch (e) {
            response.status(500).json({message:`Something went wrong ${e.message}`})
        }
    }
)

module.exports = router
