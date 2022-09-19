const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    next('route');
}, (req, res, next) => {
    console.log('실행 되지 않습니다.');
    next();
}, (req, res, next) => {
    console.log('실행 되지 않습니다.2');
    next();
});

router.get('/', (req, res, next) => {
    res.render('body', { title: 'Express' });
})

router.route('/abc')
    .get((req, res) => {
        res.send('GET /abc');
    })
    .post((req, res) => {
        res.send('POST /abc');
    })
    
module.exports = router;