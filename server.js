const http = require('http');
const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

const PORT = process.env.PORT || 3000;

const TEXT_OPACITY = process.env.TEXT_OPACITY ?
  parseFloat(process.env.TEXT_OPACITY, 10) : 0.9;

const html = fs.readFileSync(path.resolve(__dirname, 'public/index.html'))

const rand256 = () => {
  return Math.floor(Math.random() * 255);
};

const server = http.createServer((req, res) => {
  if (req.url.match(/.+\.png/)) {
    res.writeHead(200, {'Content-Type': 'image/png'});

    const canvas = createCanvas(256, 256);
    const ctx = canvas.getContext('2d');

    ctx.font = '20px Impact';
    ctx.fillStyle = `rgba(${rand256()}, ${rand256()}, ${rand256()}, ${TEXT_OPACITY})`;
    ctx.fillText(req.url.substr(0, req.url.length - 4).split('/').join('\n'), 50, 100);
    ctx.strokeStyle = `rgba(${rand256()}, ${rand256()}, ${rand256()}, ${TEXT_OPACITY})`;
    te = ctx.measureText(req.url.split('/').join('\n'));
    ctx.beginPath();
    ctx.lineTo(50, 102);
    ctx.lineTo(50 + te.width, 102);
    ctx.stroke();

    ctx.lineWidth = 10;
    ctx.strokeRect(0, 0, 256, 256);

    res.end(canvas.toBuffer(), 'binary');
  } else {
    res.writeHead(200, {'Content-Type':'text/html'})
    // res.end('TileEye. Try a URL /:z/:x/:y.png');
    res.end(html)
    
  }
});

server.listen(PORT, () => {
  console.log(`TileEye listening on port ${PORT}`);
});
