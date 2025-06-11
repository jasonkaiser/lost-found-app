$(document).ready(function () {
    const params = new URLSearchParams(window.location.hash.split('?')[1]);
    const id = params.get('id');
    const type = params.get('type');

    if (!id || !type) {
        $('#item-page').html('<p>Invalid item parameters.</p>');
        return;
    }

    const endpoint = `${type}-items/${id}`;
    const status = type.charAt(0).toUpperCase() + type.slice(1);

    const bgColor = status === 'Lost' ? 'rgba(255, 141, 141, 0.26)' : 'rgba(173, 255, 149, 0.26)';
    const borderColor = status === 'Lost' ? '#FF4B4B' : '#00A13E';
    const textColor = status === 'Lost' ? '#FF4B4B' : '#00A13E';

    let currentUser = null;

    RestClient.get(endpoint, function(item) {
        $('#item-page h1').text(item.itemName);
        $('.image-container').css('background-image', `url('${item.image}')`);
        $('.status-container')
            .text(status)
            .css({
                'background-color': bgColor,
                'border': `1px solid ${borderColor}`,
                'color': textColor
            });

        const date = new Date(item.createdAt.replace(' ', 'T')).toLocaleDateString();
        $('.date .value').text(date);
        $('.status .value').text(status);

        if (item.categoryID) {
            RestClient.get(`categories/id/${item.categoryID}`, function(category) {
                $('.category .value').text(category.categoryName || 'Unknown Category');
            }, function() {
                $('.category .value').text('Unknown Category');
            });
        } else {
            $('.category .value').text('Unknown Category');
        }

        $('.description-text').text(item.description);

        if (item.userID) {
            RestClient.get(`users/${item.userID}`, function(user) {
                currentUser = user;

                $('.contact-name').text(user.name || 'Unknown User');
              
                $('.contact-button').on('click', function () {
                    $('#user-phone').text(user.phone_number || 'Not provided');
                    $('#user-location').text(user.location || 'Not provided');
                    $('#contactModal').modal('show');
                });

            }, function() {
                $('.contact-name').text('Unknown User');
            });
        } else {
            $('.contact-name').text('Unknown User');
        }

        $('.contact-button').css({
            'background-color': borderColor,
            'border': `1px solid ${borderColor}`,
            'color': '#fff'
        });

    }, function () {
        $('#item-page').html('<p>Failed to load item details.</p>');
    });
});
