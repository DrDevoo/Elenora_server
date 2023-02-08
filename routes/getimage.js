const express = require('express');
const router = express.Router();
require("dotenv").config();
const { uploadFile, getFileStream } = require('./s3')

router.get('/:key', (req, res) => {
    const key = req.params.key
    const readStream = getFileStream(key)
    readStream.pipe(res)
})

module.exports = router;