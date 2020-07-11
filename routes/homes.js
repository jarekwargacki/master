const express = require('express');
const app = express();
const router = express.Router();





router.get('/', (req, res) => {
    res.send('from home');
});











module.exports = router;