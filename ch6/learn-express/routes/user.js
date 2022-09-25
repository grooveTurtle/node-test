const express = require('express');

const router = express.Router();

router.get('/:id', (req, res) => {
    res.send('Hello, User');
    console.log(req.params, req.query);
});

// 라우터 선언 순서 주의
router.get('/like', (req, res) => {
    console.log('전~혀 실행되지 않습니다.');
});

module.exports = router;