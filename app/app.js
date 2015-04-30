let http = require('http'),
    exec = require('child_process').exec,
    fs = require('fs'),
    jsFileName = 'browser-app-compiled.js',
    o;

// compile front-end piece on-the-fly
// just for show-and-tell on app start, you'll want to shelve this in a automative process
exec('babel browser-app.js --out-file ' + jsFileName);

// render
o = (res, status, data, header) => {
    res.writeHead(status, header);
    res.end(data);
}

// spawn server
http.createServer((req, res) => {
    if (req.url === '/' + jsFileName) {
        // file server
        fs.readFile('browser-app-compiled.js', (err, data) => {
            err ? o(res, 500, 'File doesn\'t exist') : o(res, 200, data, {'Content-Type': 'text/javascript'});
        });
    } else {
        // default
        o(res, 200, '<b>ES6</b><script src="' + jsFileName + '"></script>', {'Content-Type': 'text/html'});
    }
}).listen(3000, '0.0.0.0');
