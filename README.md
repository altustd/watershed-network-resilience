# Where Every Drop Goes

*Hidden Maps · Episode 5 — The James River Watershed as a Network*

Every raindrop in most of Virginia eventually finds the same path. This is the map of that path — a directed network of roughly 4,000 stream segments draining the James River watershed — and the handful of junctions that make it work.

---

## Read Online

**[https://altustd.github.io/watershed-network-resilience/](https://altustd.github.io/watershed-network-resilience/)**

---

## About This Study

Applies the Hidden Maps network analysis framework to the James River watershed (Virginia), using USGS National Hydrography Dataset (NHDPlus) data. The watershed is treated as a directed acyclic graph (DAG): nodes are stream junctions, edges are stream segments flowing downstream.

Key questions:
- What is the Strahler order hierarchy of the watershed?
- Which confluence nodes are structural chokepoints?
- How do flow path lengths distribute from headwaters to outlet?
- How does a directed tree network differ from the undirected networks in prior episodes?

## Hidden Maps Series

| Episode | Subject | Link |
|---|---|---|
| Ep. 0 | Primer | [network-analysis-intro](https://altustd.github.io/network-analysis-intro/) |
| Ep. 1 | Flights | [airport-network-analysis](https://altustd.github.io/airport-network-analysis/) |
| Ep. 2 | The Grid | [us-power-grid-network](https://altustd.github.io/us-power-grid-network/) |
| Ep. 3 | Streets | [road-network-resilience](https://altustd.github.io/road-network-resilience/) |
| Ep. 4 | Internet | [internet-as-topology](https://altustd.github.io/internet-as-topology/) |
| **Ep. 5** | **Watershed** | **this repo** |

## Run Locally

```bash
pixi install
pixi run pull        # fetch USGS NHDPlus data (requires network)
pixi run render      # HTML → docs/ (uses render.sh + pixi Python)
pixi run render-pdf  # PDF → docs/
pixi run preview
```

PDF: [docs/watershed-network-resilience.pdf](docs/watershed-network-resilience.pdf)

## Tech Stack

Quarto · pixi · pynhd · NetworkX · GeoPandas · Plotly
