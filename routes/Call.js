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
        if (!call) throw new Error('Error saving call')
        res.status(201).json(call)
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

router.post('/', async (req, res) => {
    const newCall = new Call(req.body)
    try {
        const call = await newCall.save()
        if (!call) throw new Error('Could not save call')
        res.status(201).json(call)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const removed = await Call.findByIdAndDelete(id)
        if (!removed) throw Error('Could not delete call')
        res.status(200).json(removed)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router