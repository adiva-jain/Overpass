<div align="center">

# 🛰️ Overpass

**Track the International Space Station in real time.**

Overpass pulls the ISS's live coordinates every 5 seconds and plots its position and ground track on a world map.

<!-- [**Live demo**](https://adiva-jain.github.io/Overpass/) · [How it works](#how-it-works) · [Run locally](#run-it-locally) -->

![JavaScript](https://img.shields.io/badge/JavaScript-vanilla-f7df1e?logo=javascript&logoColor=black)
![Canvas](https://img.shields.io/badge/Canvas_2D-rendering-0e2a47)
![No build step](https://img.shields.io/badge/build-none-2f5d50)
![License: MIT](https://img.shields.io/badge/license-MIT-ffd166)

</div>

## About

An *overpass* is when a satellite passes overhead. The ISS makes one somewhere on Earth constantly, circling the planet about every 90 minutes at roughly 27,600 km/h. Overpass shows you exactly where it is at any moment.

The project is built with plain HTML, CSS, and JavaScript. There are no frameworks, no build tools, and no API keys, so the whole thing runs in any browser.

## Features

- Live ISS position, refreshed every 5 seconds
- Fading ground track showing where the station has been
- Latitude, longitude, altitude, speed, and whether the ISS is in daylight or Earth's shadow
- World map drawn from real coastline data, sharp on high-DPI screens
- Automatic retry when the API is unreachable

## How it works

**Fetching and polling.** `script.js` requests the station's current state from the [Where the ISS at?](https://wheretheiss.at/w/developer) API. Polling uses a recursive `setTimeout` instead of `setInterval`, so each request starts only after the previous one finishes and slow responses can't pile up.

**Mapping coordinates to the screen.** The map uses an equirectangular projection, which converts latitude and longitude into pixels with two linear rescales:

```
x = (longitude + 180) / 360 × width
y = (90 − latitude)  / 180 × height
```

Latitude is subtracted from 90 because latitude increases upward while canvas y increases downward. The same `project()` function places the grid lines, the coastlines, and the ISS marker.

**Drawing the world.** Coastlines come from [Natural Earth](https://www.naturalearthdata.com/) as GeoJSON and are drawn onto an HTML canvas. GeoJSON stores points as `[longitude, latitude]`, the reverse of the usual spoken order.

**Crossing the date line.** When the ISS crosses ±180° longitude, its longitude jumps from about +179 to −179. Any trail segment whose longitude changes by more than 180° is skipped so the line doesn't streak across the map.

## Run it locally

```bash
git clone https://github.com/adiva-jain/Overpass.git
cd Overpass
python -m http.server 8000
```

Then open http://localhost:8000.

## Project structure

```
Overpass/
├── index.html   Page layout
├── style.css    Colors, typography, layout
├── script.js    Fetching, polling, projection, and drawing
└── README.md
```

## Roadmap

- [ ] Show the latitude and longitude under the mouse cursor
- [ ] Backfill the trail on page load using past positions
- [ ] Smoothly animate the marker between updates
- [ ] Predict and draw the next orbit
- [ ] Shade the night side of the Earth
- [ ] Predict the next visible overpass for your location

## Data sources

- ISS position: [wheretheiss.at API](https://wheretheiss.at/w/developer)
- Coastlines: [Natural Earth](https://www.naturalearthdata.com/) (public domain)

## License

[MIT](LICENSE)
