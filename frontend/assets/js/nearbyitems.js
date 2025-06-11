var map;
var markers = [];

window.initNearbyMap = function () {
  const sarajevo = { lat: 43.8563, lng: 18.4131 };
  map = new google.maps.Map(document.getElementById("map"), {
    center: sarajevo,
    zoom: 13,
  });

  loadItemsAndPlaceMarkers();
};

function loadItemsAndPlaceMarkers() {

  markers.forEach(m => m.setMap(null));
  markers = [];

  let lostItems = [];
  let foundItems = [];

  let lostDone = false;
  let foundDone = false;

  RestClient.get('lost-items', function (data) {
    lostItems = data;
    lostDone = true;
    if (foundDone) drawMarkers();
  }, function (xhr) {
    console.error("Failed to load lost items", xhr.responseText);
    alert('Failed to load lost items.');
  });

  RestClient.get('found-items', function (data) {
    foundItems = data;
    foundDone = true;
    if (lostDone) drawMarkers();
  }, function (xhr) {
    console.error("Failed to load found items", xhr.responseText);
    alert('Failed to load found items.');
  });

  function drawMarkers() {
    if (!Array.isArray(lostItems) || !Array.isArray(foundItems)) {
      console.error("Invalid data format", { lostItems, foundItems });
      alert('Invalid data format returned.');
      return;
    }

    placeMarkers(lostItems, 'lost', 'http://maps.google.com/mapfiles/ms/icons/red-dot.png');
    placeMarkers(foundItems, 'found', 'http://maps.google.com/mapfiles/ms/icons/green-dot.png');
  }
}




function placeMarkers(items, type, iconUrl) {
  items.forEach(item => {
    if (item.latitude && item.longitude) {
      const marker = new google.maps.Marker({
        position: {
          lat: parseFloat(item.latitude),
          lng: parseFloat(item.longitude)
        },
        map: map,
        title: item.itemName || `${type.charAt(0).toUpperCase() + type.slice(1)} Item`,
        icon: iconUrl
      });

        marker.addListener('click', () => {
        if (item.id) {
            window.location.hash = `item?id=${item.id}&type=${type}`;
        }
        });

      markers.push(marker);
    }
  });
}
