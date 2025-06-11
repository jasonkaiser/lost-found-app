$(document).ready(function () {
  const $container = $('#cards-container');
  const $searchInput = $('#search-input');

  function createCard(item, status) {
    const bgColor = status === 'Lost' ? 'rgba(255, 141, 141, 0.26)' : 'rgba(173, 255, 149, 0.26)';
    const borderColor = status === 'Lost' ? '#FF4B4B' : '#00A13E';
    const textColor = status === 'Lost' ? '#FF4B4B' : '#00A13E';
    const createdAt = new Date(item.createdAt.replace(' ', 'T')).toLocaleDateString();

    return $(`
      <div class="card-design item-card" data-id="${item.id}" data-type="${status.toLowerCase()}">
        <div class="card-image" style="background-image: url('${item.image}'); background-size: cover; background-position: center;"></div>
        <div class="card-text">
          <div class="card-title">${item.itemName}</div>
          <div class="card-status" style="background: ${bgColor}; border-color: ${borderColor}; color: ${textColor};">
            ${status}
          </div>
          <div class="card-info">
            <div class="card-data">
              <div class="card-location">
                <i class="fa-solid fa-location-dot"></i> ${item.location}
              </div>
              <div class="card-date">
                <i class="fa-solid fa-calendar"></i> ${createdAt}
              </div>
            </div>
          </div>
        </div>
      </div>
    `);
  }

  function loadItems(url, status) {
    RestClient.get(url, function (items) {
      if (Array.isArray(items) && items.length > 0) {
        items.forEach(item => {
          const $card = createCard(item, status);
          $container.append($card);
        });
      } else {
        console.log(`No ${status} items found.`);
        $container.append(`<p>No ${status} items available.</p>`);
      }
    }, function (xhr) {
      console.error(`Error fetching ${status} items from ${url}:`, xhr.responseText);
      $container.append(`<p>Error loading ${status} items. Please try again later.</p>`);
    });
  }

  function searchItems(query) {
    $container.empty();

    if (query === '') {
      loadItems('lost-items', 'Lost');
      loadItems('found-items', 'Found');
      return;
    }

    RestClient.get(`lost-items/name/${query}`, function (items) {
      if (Array.isArray(items) && items.length > 0) {
        items.forEach(item => {
          const $card = createCard(item, 'Lost');
          $container.append($card);
        });
      }
    }, function () {
      console.error('Error fetching lost items for search.');
    });

    RestClient.get(`found-items/name/${query}`, function (items) {
      if (Array.isArray(items) && items.length > 0) {
        items.forEach(item => {
          const $card = createCard(item, 'Found');
          $container.append($card);
        });
      }
    }, function () {
      console.error('Error fetching found items for search.');
    });
  }

  function debounce(func, delay) {
    let timer;
    return function () {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, arguments), delay);
    };
  }

  $searchInput.on('input', debounce(function () {
    const query = $(this).val().trim().toLowerCase();
    searchItems(query);
  }, 300));

  $container.on('click', '.item-card', function () {
    const id = $(this).data('id');
    const type = $(this).data('type');
    window.location.hash = `item?id=${id}&type=${type}`;
  });

  loadItems('lost-items', 'Lost');
  loadItems('found-items', 'Found');
});
