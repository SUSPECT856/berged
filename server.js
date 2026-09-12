const http = require('http');
const fs = require('fs');
const path = require('path');
const port = process.env.PORT || 3000;
const root = path.join(__dirname, 'public');
const types = { '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.js':'application/javascript; charset=utf-8', '.json':'application/json; charset=utf-8' };
const server = http.createServer((req,res)=>{
  let url = decodeURIComponent(req.url.split('?')[0]);
  if(url === '/') url='/index.html';
  const file = path.join(root, url);
  if(!file.startsWith(root)){ res.writeHead(403); return res.end('Forbidden'); }
  fs.readFile(file,(err,data)=>{
    if(err){ res.writeHead(404, {'Content-Type':'text/plain; charset=utf-8'}); return res.end('Not found'); }
    res.writeHead(200, {'Content-Type':types[path.extname(file)] || 'application/octet-stream', 'Cache-Control':'no-cache'});
    res.end(data);
  });
});
server.listen(port, '0.0.0.0', ()=>console.log(`Berged running on http://localhost:${port}`));
