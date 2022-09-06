setInterval(() => {
    console.log('시작');

    try {
        throw new Error('서버를 고장 냄');
    } catch (err) {
        console.error(err);
    }

}, 1000);