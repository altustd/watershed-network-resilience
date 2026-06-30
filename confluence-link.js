(function () {
  function attachConfluenceExplorer() {
    var divs = document.querySelectorAll(".plotly-graph-div");
    if (!divs.length) return;

    for (var d = divs.length - 1; d >= 0; d--) {
      var gd = divs[d];
      if (!gd || !gd.data || gd.__confluenceLinked) continue;

      var config;
      try {
        if (!gd.layout || !gd.layout.meta || !gd.layout.meta.confluence_link) continue;
        config = JSON.parse(gd.layout.meta.confluence_link);
      } catch (err) {
        continue;
      }

        var markerIdx = gd.data.findIndex(function (t) {
        return t.name === "confluence-markers";
      });
      var barIdx = gd.data.findIndex(function (t) {
        return t.name === "confluence-bars";
      });
      if (markerIdx < 0 || barIdx < 0) continue;

      gd.__confluenceLinked = true;
      var defaultSizes = config.defaultSizes;
      var defaultColors = config.defaultColors;
      var lons = config.lons;
      var lats = config.lats;

      gd.on("plotly_click", function (e) {
        if (!e.points.length || e.points[0].curveNumber !== barIdx) return;
        var i = e.points[0].pointNumber;
        var sizes = defaultSizes.map(function (s, j) {
          return j === i ? s * 2.0 : s * 0.55;
        });
        var colors = defaultColors.map(function (c, j) {
          return j === i ? "#FF2D00" : c;
        });
        var widths = defaultSizes.map(function (s, j) {
          return j === i ? 3.5 : 1.0;
        });

        Plotly.restyle(
          gd,
          {
            "marker.size": [sizes],
            "marker.color": [colors],
            "marker.line.width": [widths],
            "marker.line.color": [
              widths.map(function (w) {
                return w > 2 ? "#1a1a1a" : "#ffffff";
              }),
            ],
          },
          [markerIdx]
        );

        Plotly.restyle(
          gd,
          {
            "marker.line.width": [
              defaultColors.map(function (c, j) {
                return j === i ? 2.5 : 1.2;
              }),
            ],
            "marker.line.color": [
              defaultColors.map(function (c, j) {
                return j === i ? "#1a1a1a" : "#ffffff";
              }),
            ],
            "marker.color": [
              defaultColors.map(function (c, j) {
                return j === i ? "#FF2D00" : c;
              }),
            ],
          },
          [barIdx]
        );

        var padLon = 0.42;
        var padLat = 0.24;
        Plotly.relayout(gd, {
          "xaxis.range": [lons[i] - padLon, lons[i] + padLon],
          "yaxis.range": [lats[i] - padLat, lats[i] + padLat],
        });
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", attachConfluenceExplorer);
  } else {
    attachConfluenceExplorer();
  }

  var observer = new MutationObserver(attachConfluenceExplorer);
  observer.observe(document.body, { childList: true, subtree: true });
})();