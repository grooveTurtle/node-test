const http = require('http');
const fs = require('fs').promises;

const users = {};

http.createServer(async (req, res) => {
    console.log(req.method, req.url);
    if (req.method === 'GET') {
        if (req.url === '/') {
            const data = await fs.readFile('./restFront.html');
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            return res.end(data);
        } else if (req.url === '/about') {
            const data = await fs.readFile('./about.html');
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            return res.end(data);
        } else if (req.url === '/users') {
            res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8'});
            return res.end(JSON.stringify(users));
        }
        // 주소가 /도 /about도 아니면
        try {
            const data = await fs.readFile(`.${req.url}`);
            return res.end(data);
        } catch (err) {
        //    console.error(err);
        }

    } else if (req.method === 'POST') {
        if (req.url === '/user') {
            let body = '';
            // 요청의 body를 stream 형식으로 받음.
            req.on('data', (data) => {
                body += data;
            });

            return req.on('end', () => {
                console.log('POST 본문(Body):', body);
                const { name } = JSON.parse(body);
                const id = Date.now();
                users[id] = name;
                res.writeHead(201);
                res.end('등록 성공');
            });
        }
    } else if (req.method === 'PUT') {
        if (req.url.startsWith('/user/')) {
            const key = req.url.split('/')[2];
            let body = '';
            req.on('data', (data) => {
                body += data;
            })
            return req.on('end', () => {
                console.log('PUT 본문(Body):', body);
                users[key] = JSON.parse(body).name;
                return res.end(JSON.stringify(users));
            })
        }
    } else if (req.method === 'DELETE') { 
        if (req.url.startsWith('/user/')) {
            const key = req.url.split('/')[2];
            delete users[key];
            return res.end(JSON.stringify(users));
        }
    } else {
        //
    }

    res.writeHead(404);
    return res.end('NOT Found');
})
.listen(8082, () => {
    console.log('8082 번 포트에서 대기중입니다');
});