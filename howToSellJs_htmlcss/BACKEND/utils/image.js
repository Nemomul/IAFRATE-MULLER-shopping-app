const express = require('express')
const router = express.Router()

const _path = require("path");

router.get("/img/:path", (req, res) => {
    let path = req.params.path.replace(/_/g, "/")
    path = _path.resolve("./"+path)
    res.status(200).sendFile(path)
})

module.exports = router