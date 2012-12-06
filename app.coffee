
#
# Require all the things
#

http = require("http")
express = require("express")
Canvas = require("canvas")
app = express()
app.use express.static './public'
#
# Config
#

textOpacity = 0.9

#
# Helpers
#

# Returns Random Number between 0 and 255
rand256 = () ->
  Math.floor(Math.random() * 255)

#
# User/GUI Routes
#

# Find in ./public/index.html

#
# API/Activity/Do Stuff Routes
#

app.get "*.png", (req, res) ->
  canvas = new Canvas(256, 256)
  ctx = canvas.getContext("2d")
  ctx.font = "30px Impact"
  ctx.rotate 0.1
  ctx.fillStyle = "rgba(" + rand256() + "," + rand256() + "," + rand256() + "," + textOpacity + ")"
  ctx.fillText req.path, 50, 100
  ctx.strokeStyle = "rgba(" + rand256() + "," + rand256() + "," + rand256() + "," + textOpacity + ")"
  te = ctx.measureText(req.path)
  ctx.beginPath()
  ctx.lineTo 50, 102
  ctx.lineTo 50 + te.width, 102
  ctx.stroke()

  ctx.rotate -0.1
  ctx.lineWidth = 2;
  ctx.strokeRect 0,0,256,256

  res.type "png"
  res.send canvas.toBuffer()

#
# Listen Up
#

port = process.env.port or 3000

app.listen port
console.log "TileEye Listening on Port " + port
