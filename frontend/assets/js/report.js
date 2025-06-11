function initReportPage() {
  const availableImages = [
    'frontend/assets/images/preview1.jpg',
    'frontend/assets/images/preview2.jpg',
    'frontend/assets/images/preview3.jpg',
    'frontend/assets/images/preview4.jpg',
    'frontend/assets/images/preview5.jpg',
    'frontend/assets/images/preview6.jpg',
    'frontend/assets/images/preview7.jpeg',
    'frontend/assets/images/preview8.jpg',
    'frontend/assets/images/preview9.jpeg'
  ];

  const $imageSelector = $('#imageSelector');
  const $selectedImageInput = $('#selectedImage');
  const $previewImage = $('#previewImage');


  $imageSelector.empty();

  availableImages.forEach(src => {
    const $img = $('<img>')
      .attr('src', src)
      .addClass('img-thumbnail')
      .css({ width: '87px', height: '80px', cursor: 'pointer' })
      .on('click', function () {
        $imageSelector.find('img').removeClass('border border-primary');
        $(this).addClass('border border-primary');
        $selectedImageInput.val(src);
        $previewImage.attr('src', src).removeClass('d-none');
      });

    $imageSelector.append($img);
  });

  let selectedLat = null;
  let selectedLng = null;

  window.initMap = function () {
    const defaultCoords = { lat: 43.8563, lng: 18.4131 }; 
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 13,
      center: defaultCoords
    });

    const marker = new google.maps.Marker({
      position: defaultCoords,
      map: map,
      draggable: true
    });

    selectedLat = defaultCoords.lat;
    selectedLng = defaultCoords.lng;

    marker.addListener('dragend', function (event) {
      selectedLat = event.latLng.lat();
      selectedLng = event.latLng.lng();
    });
  };

  const $form = $('form');

  $form.off('submit').on('submit', function (e) {
    e.preventDefault();

    let isValid = true;
    $('.is-invalid').removeClass('is-invalid');

    const reportType = $('#reportType').val();
    const title = $('#title').val().trim();
    const description = $('#description').val().trim();
    let category = $('#category').val();
    const location = $('#location').val().trim();
    const date = $('#date').val();
    const selectedImage = $selectedImageInput.val();

    if (!reportType) {
      $('#reportType').addClass('is-invalid');
      Toast.error('Please select a report type.');
      isValid = false;
    }

    if (!title || title.length < 3) {
      $('#title').addClass('is-invalid');
      Toast.error('Title must be at least 3 characters.');
      isValid = false;
    }

    if (!description || description.length < 10) {
      $('#description').addClass('is-invalid');
      Toast.error('Description must be at least 10 characters.');
      isValid = false;
    }

    if (!category) {
      $('#category').addClass('is-invalid');
      Toast.error('Please select a category.');
      isValid = false;
    }

    if (!location) {
      $('#location').addClass('is-invalid');
      Toast.error('Location is required.');
      isValid = false;
    }

    if (!date) {
      $('#date').addClass('is-invalid');
      Toast.error('Please select a date.');
      isValid = false;
    } else {
      const selectedDate = new Date(date);
      const today = new Date();
      if (selectedDate > today) {
        $('#date').addClass('is-invalid');
        Toast.error('Date cannot be in the future.');
        isValid = false;
      }
    }

    if (selectedLat === null || selectedLng === null) {
      Toast.error('Please pin the location on the map.');
      isValid = false;
    }

    if (!selectedImage) {
      Toast.error('Please select an image.');
      isValid = false;
    }

    if (!isValid) return;

    const userID = localStorage.getItem('user_id');
    const token = localStorage.getItem('jwt_token');
    if (!userID || !token) {
      Toast.error('You must be logged in to submit a report.');
      return;
    }

    const categoryMap = {
      'electronics': 1,
      'wallets': 2,
      'clothing': 3,
      'keys': 4,
      'documents': 5,
      'pets': 6,
      'jewelry': 7,
      'toys': 8,
      'others': 9
    };

    category = category.toLowerCase();
    const categoryID = categoryMap[category];

    const data = {
      userID: parseInt(userID, 10),
      categoryID,
      itemName: title,
      description,
      location,
      image: selectedImage,
      latitude: selectedLat,
      longitude: selectedLng
    };

    const url = reportType === 'lost' ? '/lost-items' : '/found-items';

    RestClient.post('rest' + url, data,
      function (response) {
        Toast.success('Report submitted successfully!');
        $form[0].reset();
        $selectedImageInput.val('');
        $previewImage.addClass('d-none');
        $imageSelector.find('img').removeClass('border border-primary');
      },
      function (error) {
        Toast.error('Failed to submit report: ' + (error.error || error.message || 'Unknown error'));
      },
      { Authentication: 'Bearer ' + token }
    );
  });
}

initReportPage();
