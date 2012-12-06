
#
# Require all the things
#

http = require("http")
express = require("express")
Canvas = require("canvas")
app = express()

#
# Config
#

textOpacity = 0.8

#
# Helpers
#

# Returns Random Number between 0 and 255
rand256 = () ->
  Math.floor(Math.random() * 255)

#
# User/GUI Routes
#

app.get "/", (req, res, next) ->
  res.send "Head over to /[text].png"

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
  res.type "png"
  res.send canvas.toBuffer()

#
# Listen Up
#

port = process.env.port or 3000

app.listen port
console.log "TileEye Listening on Port " + port
