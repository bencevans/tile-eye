const http = require('http');
const Canvas = require('canvas');

//
// Config
//

// PORT: Port the HTTP server should listen.
const PORT = process.env.PORT || 3000;

// TEXT_OPACITY: Opacity of text rendered on each tile.
const TEXT_OPACITY = process.env.TEXT_OPACITY ?
  parseFloat(process.env.TEXT_OPACITY, 10) : 0.9;



/**
 * Generate a random integer between 0 & 255
 * @return {Number}
 */
const rand256 = () => {
  return Math.floor(Math.random() * 255);
};

//
// Server
//

const server = http.createServer((req, res) => {
  if (req.url.match(/.+\.png/)) {
    res.writeHead(200, {'Content-Type': 'image/png'});

    let canvas = new Canvas(256, 256);
    let ctx = canvas.getContext('2d');

    ctx.font = '20px Impact';
    ctx.fillStyle = `rgba(${rand256()}, ${rand256()}, ${rand256()}, ${TEXT_OPACITY})`;
    ctx.fillText(req.url.split('/').join('\n'), 50, 100);
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
    res.writeHead(404, {'Content-Type':'text/plain'})
    res.end('TileEye. Try a URL /:z/:x/:y.png');
  }
});

server.listen(PORT, () => {
  console.log(`TileEye listening on port ${PORT}`);
});
