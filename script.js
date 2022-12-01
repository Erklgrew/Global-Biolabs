mapboxgl.accessToken =
  "pk.eyJ1IjoiZXJpa3JlbmdsaXNoIiwiYSI6ImNqNXdnZDdnNTBlMDcyd3FzNHg5YjNsN3kifQ.kDgqHDJ00xCjvUXy8x57UA";

var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/erikrenglish/cl668zz3c000315o1lth77x14",
  center: [0, 20],
  zoom: 2
});

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

//change the site to function better on mobile

var siteWidth = 1280;
var scale = screen.height / siteWidth;

//initialize mapgeodata

//this is the BSL-4 data layer
map.on(
  "style.load",
  (initLayers = () => {
    map.addSource("Biolabs-dark", {
      type: "vector",
      url: "mapbox://styles/erikrenglish/cl95l6eko000m14o6aruk84v3"
    });

    map.addSource("Biolabs-light", {
      type: "vector",
      url: "mapbox://styles/erikrenglish/cl89x76g3000d15s3o58l90j2"
    });

    //BSL 4 LAYER DATA

    map.addLayer({
      id: "bsl4",
      type: "circle",
      source: "bsl4",
      layout: {
        // Make the layer visible by default.
        visibility: "none"
      },
      paint: {
        "circle-radius": ["interpolate", ["linear"], ["zoom"], 2, 5, 22, 20],
        "circle-color": "#3d4be6",
        "circle-opacity": 0.5,
        "circle-stroke-color": "#ffffff",
        "circle-stroke-width": 0.5
      },
      "source-layer": "bsl4"
    });

    //this is the BSL-3+ data layer

    map.addLayer({
      id: "bsl3plus",
      type: "circle",
      source: "bsl3plus",
      layout: {
        // Make the layer visible by default.
        visibility: "none"
      },
      paint: {
        "circle-radius": ["interpolate", ["linear"], ["zoom"], 2, 5, 22, 20],
        "circle-color": "#f84444",
        "circle-opacity": 0.5,
        "circle-stroke-color": "#ffffff",
        "circle-stroke-width": 0.5
      },
      "source-layer": "bsl3plus"
    });

    //this is the ABSL-4 data layer

    map.addLayer({
      id: "absl4",
      type: "circle",
      source: "absl4",
      layout: {
        // Make the layer visible by default.
        visibility: "none"
      },
      paint: {
        "circle-radius": ["interpolate", ["linear"], ["zoom"], 2, 5, 22, 20],
        "circle-color": "#800000",
        "circle-opacity": 0.5,
        "circle-stroke-color": "#000000",
        "circle-stroke-width": 0.5
      },
      "source-layer": "absl4"
    });

    //this is the INSECT BSL-4 data layer

    map.addLayer({
      id: "rbsl4",
      type: "circle",
      source: "rbsl4",
      layout: {
        // Make the layer visible by default.
        visibility: "none"
      },
      paint: {
        "circle-radius": ["interpolate", ["linear"], ["zoom"], 2, 5, 22, 20],
        "circle-color": "#800000",
        "circle-opacity": 0.5,
        "circle-stroke-color": "#000000",
        "circle-stroke-width": 0.5
      },
      "source-layer": "rbsl4"
    });

    //GOVERNANCE GEOJSON

    map.addLayer({
      id: "Governance",
      type: "fill",
      source: "Governance",
      layout: {
        // Make the layer visible by default.
        visibility: "none"
      },
      paint: {
        "fill-color": "#f84444",
        "fill-opacity": 0.5
      },
      "source-layer": "Governance"
    });

    //Stability GEOJSON

    map.addLayer({
      id: "Stability",
      type: "fill",
      source: "Stability",
      layout: {
        // Make the layer visible by default.
        visibility: "none"
      },
      paint: {
        "fill-color": "#f84444",
        "fill-opacity": 0.5
      },
      "source-layer": "Stability"
    });

    //BIOSAFETY GEOJSON

    map.addLayer({
      id: "Biosafety",
      type: "fill",
      source: "Biosafety",
      layout: {
        // Make the layer visible by default.
        visibility: "none"
      },
      paint: {
        "fill-color": "#f84444",
        "fill-opacity": 0.5
      },
      "source-layer": "Biosafety"
    });

    //BIOSECURITY GEOJSON

    map.addLayer({
      id: "Biosecurity",
      type: "fill",
      source: "Biosecurity",
      layout: {
        // Make the layer visible by default.
        visibility: "none"
      },
      paint: {
        "fill-color": "#f84444",
        "fill-opacity": 0.5
      },
      "source-layer": "Biosecurity"
    });

    //DUAL USE GEOJSON

    map.addLayer({
      id: "DualUse",
      type: "fill",
      source: "DualUse",
      layout: {
        // Make the layer visible by default.
        visibility: "none"
      },
      paint: {
        "fill-color": "#f84444",
        "fill-opacity": 0.5
      },
      "source-layer": "DualUse"
    });

    //switch layers

    switchlayer = function (lname) {
      if (document.getElementById(lname).checked) {
        map.setLayoutProperty(lname, "visibility", "visible");
      } else {
        map.setLayoutProperty(lname, "visibility", "none");
      }
    };
  })
);

//popup on hover

map.on("mouseenter", ["bsl4", "bsl3plus", "absl4", "rbsl4"], (event) => {
  map.getCanvas().style.cursor = "pointer";
  const features = map.queryRenderedFeatures(event.point, {
    layers: ["bsl4", "bsl3plus", "absl4", "rbsl4"]
  });
  if (!features.length) {
    return;
  }
  const feature = features[0];

  const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: true,
    offset: [0, 0]
  })
    .setLngLat(feature.geometry.coordinates)
    .setHTML(
      `<h3>${feature.properties.Country}</h3>
      <p>${feature.properties.Name}</p>`
    )
    .addTo(map);
  //close popup on mouse leave

  map.on("mouseleave", ["bsl4", "bsl3plus", "absl4", "rbsl4"], () => {
    map.getCanvas().style.cursor = "";
    popup.remove();
  });
});

//SCORECARDS
//popup on hover

//map.on(
//  "mousemove",
//  ["Governance", "Stability", "Biosafety", "Biosecurity", "DualUse"],
//  (event) => {
//change mouse pointer
//    map.getCanvas().style.cursor = "pointer";
//    const features = map.queryRenderedFeatures(event.point, {
//      layers: ["Governance", "Stability", "Biosafety", "Biosecurity", "DualUse"]
//    });
//    if (!features.length) {
//      return;
//    }
//    const feature = features[0];
//
//    const popup = new mapboxgl.Popup({
//      closeButton: false,
//      closeOnClick: true,
//      offset: [0, 0]
//    })
//      .setHTML(
//        `<h3>${feature.properties.Country}</h3>
//      <p>Governance: ${feature.properties.Governance}</p>
//      <p>Stability: ${feature.properties.Stability}</p>
//      <p>Biosafety: ${feature.properties.Biosafety}</p>
//      <p>Biosecurity: ${feature.properties.Biosecurity}</p>
//      <p>Dual Use: ${feature.properties.DualUse}</p>`
//      )
//      .addTo(map)
//      .trackPointer();
//close popup on mouse leave

//    map.on(
//      "mouseleave",
//      ["Governance", "Stability", "Biosafety", "Biosecurity", "DualUse"],
//      (event) => {
//        map.getCanvas().style.cursor = "";
//        popup.remove().trackPointer();
//      }
//    );
//  }
// );

//zoom to feature -- just the same as above, but with flyto
map.on("click", (event) => {
  const features = map.queryRenderedFeatures(event.point, {
    layers: ["bsl4", "bsl3plus", "absl4", "rbsl4"]
  });
  if (!features.length) {
    return;
  }
  const feature = features[0];
  map.flyTo({
    center: feature.geometry.coordinates,
    zoom: 12.5, //could change this to whatever looks best
    pitch: 0,
    bearing: 0
  });

  $("#site_name").text(feature.properties.Name);
  //this is just a subset of properties -- you'll have to figure out which you want to display. You could iterate over all of the properties using Object.keys(feature.properties) but it would be in alphabetical order which might not be what you want in terms of display.
  let property_list = [
    "Address",
    "Country",
    "Institutional Affiliation",
    "Research focus (human, animal, both)",
    "Status",
    "Additional Notes",
    "Website"
  ];
  //I'm going to keep track of what is displayed so we don't do it twice, because at the end of the above I'm going to iterate alphabetically, just as an example.
  let displayed = ["Name"];
  $("#properties").html(""); //clear any existing
  for (let i in property_list) {
    var key = property_list[i];
    if (typeof feature.properties[key] != "undefined") {
      //if property exists
      //easier than just embedding a lot of if statements..
      var val = feature.properties[key];
      var showProp = true;
      if (displayed.indexOf(key) > -1) showProp = false;
      console.log(key, showProp);
      if (val.trim() == "") showProp = false;
      if (val == "None") showProp = false; //just an example

      if (showProp) {
        //building these up as strings is a little crude, but easy
        var prop = "<div class='property'>";
        //just showing how one could adapt for specific situations
        switch (key) {
          case "Website":
            prop +=
              "<span class='prop_key'>Website:</span> <span class='prop_val'><a href=\"" +
              val +
              '" target="_blank">link</a></span>';
            break;
          default:
            prop += "<span class='prop_key'>" + key + ":</span> ";
            prop += "<span class='prop_val'>";
            prop += val;
            prop += "</span>";
            break;
        }

        prop += "</div>";
        $("#properties").append(prop);
        displayed.push(key);
      }
    }
  }
  //now just show everything else -- again, this will be kind of a mess unless you create a master property list with the order you want it in
  for (let i in Object.keys(feature.properties)) {
    var key = Object.keys(feature.properties)[i];
    var showProp = true;
    if (displayed.indexOf(key) > -1) showProp = false;
    //disabled -- if (feature.properties[key].trim() == "") showProp = false;
    if (feature.properties[key] == "None") showProp = false; //just an example

    if (showProp) {
      var prop = "<div class='property'>";
      prop += "<span class='prop_key'>" + key + ":</span> ";
      prop += "<span class='prop_val'>";
      prop += feature.properties[key];
      prop += "</span>";
      prop += "</div>";
      $("#properties").append(prop);
      displayed.push(key);
    }
  }

  console.log(feature.properties);
  $("#sidebar").css("display", "block");
  //this will never turn off as it is written, but you could decide to make it hide if you clicked away from it, or add a close button or whatever.
});

// add dropdown menu

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */

function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    //much easier if you do this kind of thing with JQuery, as shown below
    $(".dropdown-content").each(function (e) {
      $(this).removeClass("show");
    });
  }
};

// Change the base map style

const layerList = document.getElementById("mapstyle");
const inputs = layerList.getElementsByTagName("input");

for (const input of inputs) {
  input.onclick = (layer) => {
    const layerId = layer.target.id;
    map.setStyle("mapbox://styles/" + layerId);
  };
  map.on("style.load", function () {
    updateScorecard(); //add custom layer and source to the new map style
  });
}

// Update Scorecard

function updateScorecard() {
  //BSL4

  if (document.getElementById("bsl4").checked) {
    map.setLayoutProperty("bsl4", "visibility", "visible");
  } else {
    map.setLayoutProperty("bsl4", "visibility", "none");
  }

  //BSL3+

  if (document.getElementById("bsl3plus").checked) {
    map.setLayoutProperty("bsl3plus", "visibility", "visible");
  } else {
    map.setLayoutProperty("bsl3plus", "visibility", "none");
  }

  //ASBL4

  if (document.getElementById("absl4").checked) {
    map.setLayoutProperty("absl4", "visibility", "visible");
  } else {
    map.setLayoutProperty("absl4", "visibility", "none");
  }

  //Governance

  if (document.getElementById("Governance").checked) {
    map.setLayoutProperty("Governance", "visibility", "visible");
  } else {
    map.setLayoutProperty("Governance", "visibility", "none");
  }

  //Stability

  if (document.getElementById("Stability").checked) {
    map.setLayoutProperty("Stability", "visibility", "visible");
  } else {
    map.setLayoutProperty("Stability", "visibility", "none");
  }

  //Biosafety

  if (document.getElementById("Biosafety").checked) {
    map.setLayoutProperty("Biosafety", "visibility", "visible");
  } else {
    map.setLayoutProperty("Biosafety", "visibility", "none");
  }

  //Biosecurity

  if (document.getElementById("Biosecurity").checked) {
    map.setLayoutProperty("Biosecurity", "visibility", "visible");
  } else {
    map.setLayoutProperty("Biosecurity", "visibility", "none");
  }

  //Dual Use

  if (document.getElementById("DualUse").checked) {
    map.setLayoutProperty("DualUse", "visibility", "visible");
  } else {
    map.setLayoutProperty("DualUse", "visibility", "none");
  }
} //end of function

//fly back to global view

document.getElementById("global").addEventListener("click", () => {
  // Fly to a random location
  map.flyTo({
    center: [0, 20],
    zoom: 2,
    bearing: 0,
    pitch: 0
  });
});

//fly to selected country
//easier to manage the click stuff in JQuery
$(".dropdown-content a").on("click", function () {
  //I would do it this way -- set a flyto attribute in the <a> element for each place that is of the format lat,lon,zoom.
  //then we just grab the attribute, split() it into parts, and pass it to map.flyTo();
  if ($(this).attr("flyto")) {
    var flyto = $(this).attr("flyto").split(",");
    map.flyTo({
      center: [+flyto[1], +flyto[0]],
      zoom: +flyto[2],
      essential: true
    });
  }
});

//Optimize for mobile?

if (window.Touch) {
  /* JavaScript for  touch interface */
}

//hide sidebar

function toggleSidebar(ref) {
  document.getElementById("sidebar").classList.toggle("active");
  var x = document.getElementById("site_name");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
  var x = document.getElementById("properties");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

//hide legend

function toggleLegend(ref) {
  document.getElementById("controller").classList.toggle("active");
  var x = document.getElementById("sub-control");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}