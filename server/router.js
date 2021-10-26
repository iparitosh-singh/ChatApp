const express = require('express')

const router = express.Router()

router.get('/', (_, res) => {
    res.send('server router is working')
})

module.exports = router
