# TileEye

> Little PNG Tile Server for debugging Slippy Maps.

## Install & Run

**From Source** - requires git, nodejs, npm & libcairo2

```
$ git clone https://github.com/bencevans/TileEye.git
$ cd TileEye
$ npm install
$ npm start
```

**From Docker (Source)** - requires git & docker

```
$ git clone https://github.com/bencevans/TileEye.git
$ cd TileEye
$ docker build -t bencevans/tile-eye
$ docker run -p 3000:3000 bencevans/tile-eye
```

**From Docker (Registry)** - requires Docker

```
$ docker run -p 3000:3000 bencevans/tile-eye
```



## Adding Tiles to Web maps

**Add to OpenLayers**

```javascript
let tileEyeLayer = new ol.layer.Tile({
  source: new ol.source.XYZ({
    url: 'http://[TILEEYE_HOST]/{z}/{x}/{y}.png'
  })
});
map.addLayer(tileEyeLayer);
```

**Add to Leaflet.js**

```javascript
L.tileLayer('http://[TILEEYE_HOST]/{z}/{x}/{y}.png', {
  attribution: 'TileEye'
}).addTo(map);
```

## License

MIT © [Ben Evans](http://bencevans.io)
