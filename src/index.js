let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 14,
    center: new google.maps.LatLng(52.137711, -0.48824),
    mapTypeId: "terrain",
  });
  $.getJSON("http://localhost/store-locator/src/db_maps.php", function (data) {
    console.log(data[0]);
    var location = JSON.parse(JSON.stringify(data));
    console.log(location);
    for (let i = 0; i < location.length; i++) {
      var data_location = location[i];
      var latLng = new google.maps.LatLng(
        data_location.latitude,
        data_location.longitude
      );

      new google.maps.Marker({
        position: latLng,
        map: map,
      });
    }
  });
}
function locationFind() {
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
  });
}
