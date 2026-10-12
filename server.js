// Zero-dependency static file server for the Deepsyke Solutions site.
// Works on Render (Web Service) and anywhere Node runs.
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const ROOT = __dirname;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.pdf': 'application/pdf',
  '.mp4': 'video/mp4',
};

function send(res, status, body, headers) {
  res.writeHead(status, Object.assign({ 'Content-Type': 'text/html; charset=utf-8' }, headers || {}));
  res.end(body);
}

const server = http.createServer((req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    return send(res, 405, '<h1>405 Method Not Allowed</h1>');
  }

  let urlPath;
  try {
    urlPath = decodeURIComponent((req.url || '/').split('?')[0].split('#')[0]);
  } catch (e) {
    return send(res, 400, '<h1>400 Bad Request</h1>');
  }

  if (urlPath === '/' || urlPath === '') urlPath = '/index.html';

  // Resolve safely inside ROOT (block path traversal).
  const filePath = path.normalize(path.join(ROOT, urlPath));
  if (filePath !== ROOT && !filePath.startsWith(ROOT + path.sep)) {
    return send(res, 403, '<h1>403 Forbidden</h1>');
  }

  fs.stat(filePath, (err, stat) => {
    if (err || !stat.isFile()) {
      const notFound = path.join(ROOT, '404.html');
      return fs.readFile(notFound, (e2, data) => {
        if (e2) return send(res, 404, '<h1>404 Not Found</h1>');
        send(res, 404, data);
      });
    }

    const ext = path.extname(filePath).toLowerCase();
    const type = MIME[ext] || 'application/octet-stream';
    const isHtml = ext === '.html';
    const headers = {
      'Content-Type': type,
      'Cache-Control': isHtml ? 'no-cache' : 'public, max-age=86400',
      'X-Content-Type-Options': 'nosniff',
    };

    if (req.method === 'HEAD') {
      res.writeHead(200, Object.assign({ 'Content-Length': stat.size }, headers));
      return res.end();
    }

    res.writeHead(200, Object.assign({ 'Content-Length': stat.size }, headers));
    fs.createReadStream(filePath).on('error', () => res.destroy()).pipe(res);
  });
});

server.listen(PORT, () => {
  console.log('Deepsyke site running on http://0.0.0.0:' + PORT);
});
