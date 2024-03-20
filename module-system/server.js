const http = require('http');
const PORT = 4000;
const targetObject = { a: 1, b: 2 };
const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/home') {
        req.on('data', data => {
            console.log(data);
            const stringifiedData = data.toString(); 
            //버퍼로 들어와서 string으로 변환
            // 왜 버퍼로 들어옴?
            console.log(stringifiedData);
            Object.assign(targetObject, JSON.parse(stringifiedData));
        })
    } else {
        if (req.url === '/home') {
            res.writeHead(200, {
                'Content-Type': 'text/json',
            });
            res.end(JSON.stringify(targetObject));
        } else if (req.url === '/about') {
            res.setHeader('Content-Type', 'text/html');
            res.write('<html>')
            res.write('<body>')
            res.write('<h1>About page<h1>')
            res.write('</body>')
            res.write('</html>')
            res.end();
        } else {
            res.statusCode = 404;
            res.end();
        }
    }
});

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}..`);
})