// const express = require('express')
import express from 'express'
import mongoose from 'mongoose'

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/hack_it')
    .then(() => {
        console.log('MongoDB connected')
    })
    .catch(err => {
        console.error('MongoDB connection error:', err)
    })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})