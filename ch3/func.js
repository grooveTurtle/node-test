const { odd, even } = require('./var');

// 다른 모듈을 require 하여 모듈화
function checkOddOrEven(num) { 
    if (num % 2) {
        return odd;
    }

    return even;
}

module.exports = checkOddOrEven;