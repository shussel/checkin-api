const { Router } = require('express')
const Call = require('../models/Call')

const router = Router()

router.get('/', async (req, res) => {
    try {
        const callList = await Call.find({})
        if (!callList) throw new Error('No Calls found')
        res.status(200).json(callList)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const call = await Call.findOne({ _id: (req.params.id) })
        if (!call) throw new Error('Call not found')
        res.status(200).json(call)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/', async (req, res) => {
    const newCall = new Call(req.body)
    try {
        const call = await newCall.save()
        if (!call) throw new Error('Something went wrong saving the call')
        res.status(200).json(call)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.patch('/:id', async (req, res) => {
    try {
        const result = await Call.updateOne(
            { _id: req.params.id },
            {
                $push: { checkins: [req.body] }
            }
        );
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ message: error.message, reqbody: req.body })
    }
})

module.exports = router