let http = require('http'),
    exec = require('child_process').exec,
    fs = require('fs'),
    jsFileName = 'browser-app-compiled.js',
    o;

// compile front-end piece on-the-fly
exec('babel browser-app.js --out-file ' + jsFileName);

o = (res, status, data, header) => {
    res.writeHead(status, header);
    res.end(data);
}

// spawn server
http.createServer((req, res) => {
    if (req.url === '/' + jsFileName) {
        fs.readFile('browser-app-compiled.js', (err, data) => {
            err ? o(res, 500, 'File doesn\'t exist') : o(res, 200, data, {'Content-Type': 'text/javascript'});
        });
    } else {
        o(res, 200, '<b>ES6</b><script src="browser-app-compiled.js"></script>', {'Content-Type': 'text/html'});
    }
}).listen(3000, '0.0.0.0');