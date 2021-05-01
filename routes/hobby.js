const express = require('express')
const { isAuthorized, isAdmin } = require('../utils/auth')
const router = express.Router()

const Hobby = require('./../schemas/hobbies')

router.get('/', async (req, res) => {
    const hobbies = await Hobby.find()
    res.status(200).send({
        success: true,
        hobbies: hobbies
    })
})

router.post('/', isAuthorized, isAdmin, async (req, res)=> {
    const hobby = new Hobby({
        name: req.body.name
    })
    await hobby.save()
    res.status(201).send({
        success: true,
        hobby: hobby
    })
})



module.exports = {
    hobbyRouter: router
}