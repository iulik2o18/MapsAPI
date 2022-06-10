class Locations {
  constructor() {
    this.map = map;
  }

  static initMap() {
    this.map = new google.maps.Map(document.getElementById("map"), {
      zoom: 14,
      center: new google.maps.LatLng(52.137711, -0.48824),
      mapTypeId: "terrain",
    });
    const data = {};
    var information = new google.maps.InfoWindow();
    fetch("http://localhost/store-locator/src/db_maps.php")
      .then((data) => data.json())
      .then((data) => {
        for (let i = 0; i < data.length; i++) {
          var data_location = data[i];
          var latLng = new google.maps.LatLng(
            data_location.latitude,
            data_location.longitude
          );
          var db_marker = new google.maps.Marker({
            position: latLng,
            map: map,
          });
          db_marker.set("id", i);
          google.maps.event.addListener(
            db_marker,
            "click",
            (function (db_marker) {
              return function () {
                information.setContent(
                  `<div class="w-40 text-center">
                  <p class = "mb-2 font-semibold">${data[i]["name"]}</p>
                  <p>${data[i]["description"]}</p>
                  </div>`
                );
                information.open(map, db_marker);
              };
            })(db_marker)
          );
          db_marker.setMap(map);
        }
        let content = "";
        data.forEach(function (value) {
          let val = value;
          console.log(val);
          content += `<tr class="bg-gray-100 border-b">
                  <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap truncate text-left" >${val.name}</td>
                  <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap truncate text-left" >${val.location}</td>
                  <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap truncate text-left" >${val.description}</td>
                 </tr>`;
        });
        document.querySelector("#template").innerHTML = content;
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  static markerUrl() {
    google.maps.event.trigger(db_marker[i], "click");
  }

  markerAddress() {
    let content = "";
    data.forEach(function (value) {
      let val = value;
      console.log(val);
      content += `<tr class="bg-gray-100 border-b">
                  <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap truncate text-left" id = "name">${val.name}</td>
                  <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap truncate text-left" id = "address">${val.location}</td>
                  <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap truncate text-left" id = "description">${val.description}</td>
                 </tr>`;
    });

    // for (let j = 0; j < db_marker.length; j++) {
    //   console.log(db_marker);
    //   content += `<tr class="bg-gray-100 border-b">
    //           <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap truncate text-left" id = "name">${data_location.name}</td>
    //           <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap truncate text-left" id = "address">${data_location.address}</td>
    //           <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap truncate text-left" id = "description">${data_location.description}</td>
    //           </tr>`;
    // }
    document.querySelector("#template").innerHTML = content;
  }

  static locationFind() {
    var geoLoc = new google.maps.Geocoder();
    let address = document.getElementById("site-search").value;
    //console.log(address);
    geoLoc.geocode({ address: address + "|GB" }, function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        var latitude = results[0].geometry.location.lat();
        var longitude = results[0].geometry.location.lng();
      }
      var latLng = new google.maps.LatLng(latitude, longitude);
      var marker = new google.maps.Marker({
        position: latLng,
        zoom: 14,
        map: map,
        title: "New input",
      });
      map.panTo(marker.getPosition());
      marker.setMap(map);
      marker.addListener("click", function () {
        marker.setMap(null);
      });
    });
  }
}

window.initMap = Locations.initMap;
window.locationFind = Locations.locationFind;
window.markerAddress = Locations.markerAddress;
