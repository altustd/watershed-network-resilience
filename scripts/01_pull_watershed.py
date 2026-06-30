#!/usr/bin/env python3
"""Pull James River watershed flowlines from USGS NHDPlus via pynhd and cache to parquet."""

from __future__ import annotations

from pathlib import Path

import pandas as pd
from pynhd import NLDI, WaterData

ROOT = Path(__file__).resolve().parents[1]
PROCESSED = ROOT / "data" / "processed"
PROCESSED.mkdir(parents=True, exist_ok=True)

# James River at Buchanan, VA — captures upper/middle James drainage
OUTLET_SITE = "USGS-02037500"

FLOWLINES_PATH = PROCESSED / "james_river_flowlines.parquet"
BASIN_PATH = PROCESSED / "james_river_basin.parquet"


def pull_flowlines() -> None:
    print(f"Pulling upstream tributaries from {OUTLET_SITE}...")
    nldi = NLDI()

    basin = nldi.get_basins(OUTLET_SITE)
    basin.to_parquet(BASIN_PATH)
    print(f"Basin saved: {BASIN_PATH}")

    flowlines = nldi.navigate_byid(
        "nwissite",
        OUTLET_SITE,
        "upstreamTributaries",
        "flowlines",
        distance=9999,
    )
    flowlines.to_parquet(FLOWLINES_PATH)
    print(f"Flowlines saved: {FLOWLINES_PATH} ({len(flowlines)} segments)")


def pull_nhd_attributes() -> None:
    if not FLOWLINES_PATH.exists():
        raise FileNotFoundError("Run pull_flowlines() first")

    flowlines = pd.read_parquet(FLOWLINES_PATH)
    comids = flowlines["nhdplus_comid"].dropna().astype(int).tolist()
    print(f"Fetching NHDPlus attributes for {len(comids)} COMIDs...")

    wd = WaterData("nhdflowline_network")
    nhd = wd.byid("comid", comids)
    nhd.to_parquet(PROCESSED / "james_river_nhd.parquet")
    print(f"NHD attributes saved: {len(nhd)} segments")


if __name__ == "__main__":
    pull_flowlines()
    pull_nhd_attributes()
